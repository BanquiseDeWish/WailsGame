<?php

namespace App\Http\Controllers\Admin;

use App\Models\QMQuestionsCommunity;
use App\Models\QMReports;
use App\Models\User;
use App\Models\QuizzMasterHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

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
}
