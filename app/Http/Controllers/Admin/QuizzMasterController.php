<?php

namespace App\Http\Controllers\Admin;

use App\Models\QMQuestionsCommunity;
use App\Models\QMReports;
use App\Models\User;
use App\Models\QuizzMasterHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;

class QuizzMasterController extends Controller
{

    public function history()
    {
        $history = QuizzMasterHistory::all();
        foreach($history as $k => $party) {
            $history[$k]['leader'] = User::select('id', 'twitch_id', 'twitch_username')->where('twitch_id', '=', $party->user_leader_id)->first();
            $history[$k]['data_party'] = json_decode(json_decode($party->data_party));
            foreach($history[$k]['data_party']->players as $k2 => $player) {
                $history[$k]['data_party']->players[$k2]->user = User::select('id', 'twitch_id', 'twitch_username')->where('twitch_id', '=', $player->userId)->first();
            }
        }
        return Inertia::render('Tools/Quizz/Admin/History', ['history' => $history]);
    }

    public function stats()
    {
        $history = QuizzMasterHistory::all();
        $questionsLength = 0;
        foreach($history as $k => $party) {
            $history[$k]['leader'] = User::select('id', 'twitch_id', 'twitch_username')->where('twitch_id', '=', $party->user_leader_id)->first();
            $history[$k]['data_party'] = json_decode(json_decode($party->data_party));
            foreach($history[$k]['data_party']->players as $k2 => $player) {
                $history[$k]['data_party']->players[$k2]->user = User::select('id', 'twitch_id', 'twitch_username')->where('twitch_id', '=', $player->userId)->first();
                $questionsLength += count($history[$k]['data_party']->questionsPayload);
            }
        }
        $playersDistinct = QuizzMasterHistory::distinct('user_leader_id')->count();
        $averagePartiesByWeek = QuizzMasterHistory::selectRaw('WEEK(created_at) as semaine, COUNT(*) as nombre_occurrences')
                                                    ->groupBy('semaine')
                                                    ->get();
        $totalPartiesByWeek = 0;
        $dayPartiesByWeek = 0;
        foreach ($averagePartiesByWeek as $resultat) {
            $totalPartiesByWeek += $resultat->nombre_occurrences;
            $dayPartiesByWeek++;
        }
        if ($dayPartiesByWeek > 0) {
            $averagePartiesByWeek = $totalPartiesByWeek / $dayPartiesByWeek;
        } else {
            $averagePartiesByWeek = 0; // Pour éviter une division par zéro
        }
        $averagePartiesByWeek = (int) $averagePartiesByWeek;

        $averagePartiesByDay = QuizzMasterHistory::selectRaw('DAYOFWEEK(created_at) as jour_semaine, COUNT(*) as nombre_occurrences')
                                            ->whereRaw('created_at >= CURDATE() - INTERVAL 7 DAY')
                                            ->groupBy('jour_semaine')
                                            ->get();
        $totalPartiesByDay = 0;
        $dayPartiesByDay = 0;

        foreach ($averagePartiesByDay as $resultat) {
            $totalPartiesByDay += $resultat->nombre_occurrences;
            $dayPartiesByDay++;
        }

        if ($dayPartiesByDay > 0) {
            $averagePartiesByDay = $totalPartiesByDay / $dayPartiesByDay;
        } else {
            $averagePartiesByDay = 0; // Pour éviter une division par zéro
        }
        $averagePartiesByDay = (int) $averagePartiesByDay;

        $totalQuestions = 0;
        $elementsQuestions = 0;
        foreach ($history as $resultat) {
            $dataParty = $resultat->data_party;
            if (isset($dataParty->questionsPayload)) {
                $totalQuestions += count($dataParty->questionsPayload);
                $elementsQuestions++;
            }
        }
        if ($elementsQuestions > 0) {
            $averageQuestions = $totalQuestions / $elementsQuestions;
        } else {
            $averageQuestions = 0;
        }
        $averageQuestions = (int) $averageQuestions;

        $totalPlayers = 0;
        $elementsPlayers = 0;
        foreach ($history as $resultat) {
            $dataParty = $resultat->data_party;
            if (isset($dataParty->players)) {
                $totalPlayers += count($dataParty->players);
                $elementsPlayers++;
            }
        }
        if ($elementsPlayers > 0) {
            $averagePlayers = $totalPlayers / $elementsPlayers;
        } else {
            $averagePlayers = 0;
        }
        $averagePlayers = (int) $averagePlayers;

        $playerMostPlaying = QuizzMasterHistory::groupBy('user_leader_id')
            ->select('user_leader_id', QuizzMasterHistory::raw('count(*) as nombreOccurrences'))
            ->orderBy('nombreOccurrences', 'desc')
            ->first();

        $playerMostPlaying = User::select('twitch_username', 'twitch_id')->where('twitch_id', '=', $playerMostPlaying->user_leader_id)->first();


        $playerMostPlayingUsername = "N/A";

        if($playerMostPlaying !== null) {
            $playerMostPlayingUsername = $playerMostPlaying->twitch_username;
        }

        return Inertia::render('Tools/Quizz/Admin/Stats', ['history' => $history, 'stats' => ['averagePlayers' => $averagePlayers, 'averageQuestions' => $averageQuestions, 'averagePartiesByWeek' => $averagePartiesByWeek, 'averagePartiesByDay' => $averagePartiesByDay, 'playerMostPlaying' => $playerMostPlayingUsername, 'questionsLength' => $questionsLength, 'playersDistinct' => $playersDistinct]]);
    }
}
