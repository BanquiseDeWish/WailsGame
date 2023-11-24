<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\VipGame;
use Illuminate\Http\Request;
use App\Models\GameStat;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class VIPGameController extends Controller
{
    /**
    * Index for VipGames
    */
    public function index(Request $request)
    {
        $ranking = self::getRanking();
        $stats = self::getStats();
        return Inertia::render('Games/VipGamesIndex', [
            'ranking' => $ranking,
            'stats' => $stats
        ]);
    }

    /**
     * Get the ranking of the VIPGames
     */
    public static function getRanking() {
        $ranking = DB::table('vipgames_history')
            ->select(DB::raw('winner_id AS user_id, COUNT(winner_id) AS points'))
            ->groupBy('winner_id')
            ->orderBy('points', 'desc');

        $ranking = $ranking->limit(100)->get();

        foreach ($ranking as $index => $rank) {
            $user = User::where('twitch_id', '=', $rank->user_id)->first();
            if ($user == null) $rank->userName = "N/A";
            else $rank->userName = $user->twitch_username;
        }

        return $ranking;
    }

    public static function registerGame(Request $request) {
        $input = $request->all();
        if(!isset($input['winner_id']))
            return response()->json(['error' => 'winner_id must be set'], 400);
        if(!isset($input['winning_ticket']))
            return response()->json(['error' => 'winning_ticket must be set'], 400);
        if(!isset($input['bonus_tickets']))
            return response()->json(['error' => 'bonus_tickets must be set'], 400);
        if(!isset($input['number_of_tickets']))
            return response()->json(['error' => 'number_of_tickets must be set'], 400);
        if(!isset($input['stream_id']))
            return response()->json(['error' => 'stream_id must be set'], 400);
        if(!isset($input['stats']))
            return response()->json(['error' => 'stats must be set'], 400);
        VipGame::registerOrUpdate(
            $input['winner_id'],
            $input['winning_ticket'],
            $input['bonus_tickets'],
            $input['number_of_tickets'],
            $input['stream_id'],
            $input['stats']
        );

        self::calcStats();
        return response()->json(['success' => 'VIPGame registered'], 200);
    }

    private static function calcStats() {
        $vipgames = VipGame::all();
        $gameTime = [];
        $tickets = array_fill(0, 100, 0);
        $ticketsAttempt = 0;
        $playersAverage = [];
        $players = [];
        $all_bonus = [];
        $vipgames_with_gametime_stats = 0;
        $vipgames_with_players_stats = 0;
        foreach($vipgames as $vipgame) {
            if(!isset($vipgame->stats)) continue;
            $vipgameStats = json_decode($vipgame->stats);
            if(isset($vipgameStats->gameTime))
                $gameTime[] = $vipgameStats->gameTime;
            if(isset($vipgameStats->tickets)) {
                foreach($vipgameStats->tickets as $ticket) {
                    $tickets[$ticket->ticket] += 1;
                }
                $ticketsAttempt += count($vipgameStats->tickets);
                $vipgames_with_gametime_stats++;
            }
            if(isset($vipgameStats->players)) {
                foreach($vipgameStats->players as $player) {
                    if(!isset($players[$player->id]))
                        $players[$player->id] = 0;
                    $players[$player->id] += $player->totalAttempt;
                }
                $playersAverage[] = count($vipgameStats->players);
                $vipgames_with_players_stats++;
            }
            if(isset($vipgameStats->bonus)) {
                foreach($vipgameStats->bonus as $bonus) {
                    if(!isset($all_bonus[$bonus->bonus]))
                        $all_bonus[$bonus->bonus] = 0;
                    $all_bonus[$bonus->bonus] += 1;
                }
            }
        }

        $stats = [
            'average_game_time' => array_sum($gameTime)/$vipgames_with_gametime_stats,
            'most_ticket_played' => array_search(max($tickets), $tickets),
            'total_attempt' => $ticketsAttempt,
            'average_player' => array_sum($playersAverage)/$vipgames_with_players_stats,
            'player_with_most_attempt' => array_search(max($players), $players),
            'most_bonus_used' => array_search(max($all_bonus), $all_bonus),
        ];

        GameStat::updateStat('vipgames', 'average_game_time', $stats['average_game_time']);
        GameStat::updateStat('vipgames', 'most_ticket_played', $stats['most_ticket_played']);
        GameStat::updateStat('vipgames', 'total_attempt', $stats['total_attempt']);
        GameStat::updateStat('vipgames', 'average_player', $stats['average_player']);
        GameStat::updateStat('vipgames', 'player_with_most_attempt', $stats['player_with_most_attempt']);
        GameStat::updateStat('vipgames', 'most_bonus_used', $stats['most_bonus_used']);
    }

    /**
     * Get all stats for the VIPGames
     */
    public static function getStats() {
        $stats = GameStat::where('game', '=', 'vipgames')->get();
        $stats = $stats->keyBy('stat_name');

        $stats['most_ticket_played']->stat_value = $stats['most_ticket_played']->stat_value + 1;

        $user = User::where('twitch_id', '=', $stats['player_with_most_attempt']->stat_value)->first();
        if($user != null)
            $stats['player_with_most_attempt']->stat_value = $user->twitch_username;

        $stats['average_game_time']->stat_value = sprintf('%d mins %d sec', $stats['average_game_time']->stat_value/60%60, $stats['average_game_time']->stat_value%60);

        return $stats;
    }
}
