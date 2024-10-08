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
        $lastWinner = self::getLastWinner();
        return Inertia::render('Games/VipGamesIndex', [
            'ranking' => $ranking,
            'stats' => $stats,
            'lastWinner' => $lastWinner
        ]);
    }

    public function play(Request $request)
    {
        return Inertia::render('Games/VIPGames/VipGame');
    }

    /**
     * Get the ranking of the VIPGames
     */
    public static function getRanking()
    {
        $ranking = DB::table('vipgames_history')
            ->select(DB::raw('winner_id AS user_id, COUNT(winner_id) AS points'))
            ->groupBy('winner_id')
            ->orderBy('points', 'desc');

        $ranking = $ranking->limit(100)->get();

        foreach ($ranking as $index => $rank) {
            $user = User::where('twitch_id', '=', $rank->user_id)->first();
            if ($user == null)
                $rank->user_name = "N/A";
            else
                $rank->user_name = $user->twitch_username;
        }

        return $ranking;
    }

    public static function registerGame(Request $request)
    {
        $input = $request->all();
        if (!isset($input['winner_id']))
            return response()->json(['error' => 'winner_id must be set'], 400);
        if (!isset($input['stream_id']))
            return response()->json(['error' => 'stream_id must be set'], 400);
        if (!isset($input['stats']))
            return response()->json(['error' => 'stats must be set'], 400);
        VipGame::register(
            $input['winner_id'],
            $input['stream_id'],
            $input['stats']
        );

        self::calcStats();
        return response()->json(['success' => 'VIPGame registered'], 200);
    }

    public static function calcStatsView(Request $request)
    {
        self::calcStats();
        return response()->json(['success' => 'Stats calculated'], 200);
    }

    private static function calcStats()
    {
        $vipgames = VipGame::all();
        $gameTime = [];
        $tickets = array_fill(0, 100, 0);
        $ticketsAttempt = 0;
        $playersAverage = [];
        $players = [];
        $all_bonus = [];
        $vipgames_with_gametime_stats = 0;
        $vipgames_with_players_stats = 0;
        foreach ($vipgames as $vipgame) {
            if (!isset($vipgame->stats))
                continue;
            $vipgameStats = json_decode($vipgame->stats);
            if (isset($vipgameStats->gameTime))
                $gameTime[] = $vipgameStats->gameTime;
            if (isset($vipgameStats->tickets)) {
                foreach ($vipgameStats->tickets as $ticket) {
                    $tickets[$ticket->ticket] += 1;
                }
                $ticketsAttempt += count($vipgameStats->tickets);
                $vipgames_with_gametime_stats++;
            }
            if (isset($vipgameStats->players)) {
                foreach ($vipgameStats->players as $player) {
                    if (!isset($players[$player->id]))
                        $players[$player->id] = 0;
                    $players[$player->id] += $player->totalAttempt;
                }
                $playersAverage[] = count($vipgameStats->players);
                $vipgames_with_players_stats++;
            }
            if (isset($vipgameStats->bonus)) {
                foreach ($vipgameStats->bonus as $bonus) {
                    if (!isset($all_bonus[$bonus->bonus]))
                        $all_bonus[$bonus->bonus] = 0;
                    $all_bonus[$bonus->bonus] += 1;
                }
            }
        }

        $players_with_most_attempt = [];

        for ($i = 0; $i < 3; $i++) {
            if (count($players) == 0)
                break;
            $maxIndex = array_search(max($players), $players);
            $maxAttempt = $players[$maxIndex];
            unset($players[$maxIndex]);
        
            $players_with_most_attempt[] = [
                'id' => $maxIndex,
                'totalAttempt' => $maxAttempt
            ];
        }

        if(count($tickets) == 0) $most_ticket_played = 0; else $most_ticket_played = array_search(max($tickets), $tickets);
        if(count($playersAverage) == 0) $average_player = 0; else $average_player = intval(array_sum($playersAverage) / $vipgames_with_players_stats);
        if(count($gameTime) == 0) $average_game_time = 0; else $average_game_time = array_sum($gameTime) / $vipgames_with_gametime_stats;
        if(count($all_bonus) == 0) $most_bonus_used = 0; else $most_bonus_used = array_search(max($all_bonus), $all_bonus);

        $stats = [
            'average_game_time' => $average_game_time,
            'most_ticket_played' => $most_ticket_played,
            'total_attempt' => $ticketsAttempt,
            'average_player' => $average_player,
            'players_with_most_attempt' => json_encode($players_with_most_attempt),
            'most_bonus_used' => $most_bonus_used,
        ];

        GameStat::updateStat('vipgames', 'average_game_time', $stats['average_game_time']);
        GameStat::updateStat('vipgames', 'most_ticket_played', $stats['most_ticket_played']);
        GameStat::updateStat('vipgames', 'total_attempt', $stats['total_attempt']);
        GameStat::updateStat('vipgames', 'average_player', $stats['average_player']);
        GameStat::updateStat('vipgames', 'players_with_most_attempt', $stats['players_with_most_attempt']);
        GameStat::updateStat('vipgames', 'most_bonus_used', $stats['most_bonus_used']);
    }

    /**
     * Get all stats for the VIPGames
     */
    public static function getStats()
    {
        $stats = GameStat::where('game', '=', 'vipgames')->get();
        $stats = $stats->keyBy('stat_name');

        $stats['most_ticket_played']->stat_value = $stats['most_ticket_played']->stat_value + 1;

        $players_with_most_attempt = json_decode($stats['players_with_most_attempt']->stat_value, true);
        foreach($players_with_most_attempt as $k => $player) {
            $user = User::where('twitch_id', '=', $player['id'])->first();
            if ($user != null)
                $players_with_most_attempt[$k]['username'] = $user->twitch_username;
        }
        $stats['players_with_most_attempt']->stat_value = $players_with_most_attempt;
        $stats['average_game_time']->stat_value = sprintf('%d mins %d sec', $stats['average_game_time']->stat_value / 60 % 60, $stats['average_game_time']->stat_value % 60);

        return $stats;
    }

    public static function getLastWinner()
    {
        $lastWinner = VipGame::orderBy('created_at', 'desc')->first();
        if ($lastWinner == null)
            return null;
        $user = User::where('twitch_id', '=', $lastWinner->winner_id)->first();
        return $user;
    }
}
