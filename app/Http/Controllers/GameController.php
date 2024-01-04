<?php

namespace App\Http\Controllers;

use App\Models\PredigivreHistory;
use App\Models\PredigivrePoints;
use App\Models\VipGamePoint;
use Illuminate\Http\Request;

use App\Models\User;

use Inertia\Inertia;

class GameController extends Controller
{
    //
    public function toolsIndex($game)
    {
        if($game == 'shiny_race_battle')
            return Inertia::render('Tools/ShinyRaceBattle/ShinyRaceBattle');

        return Inertia::render('Tools/ShinyRaceBattle/ShinyRaceBattle');
    }

    public function play(Request $request, $game)
    {
        if($game == 'vipgames')
            return Inertia::render('Games/Play/VipGame', ['get'=>$request->all()]);
        else if($game == 'predi_grivee')
            return Inertia::render('Games/PrediGivreeIndex');

        return Inertia::render('Games/Play/VipGame', ['get'=>$request->all()]);
    }


    public function getUserGameInfos(Request $request) {
        $inputs = $request->all();
        if(!isset($inputs['game']) || !isset($inputs['userId']))
            return response()->json(["state" => "fail", "error" => "missing parameters"]);

        $game = $inputs['game'];
        $userId = $inputs['userId'];

        $user = User::getFromId($userId);
        if(!$user)
            return response()->json(["state" => "fail", "error" => "user not found"]);

        switch($game){
            case 'vipgames':
                return response()->json([
                    "state" => "success",
                    "user" => $user,
                    "points" => $user->getVIPGamePoints()
                ]);


            default:
                break;
        }

        return response()->json(["state" => "fail", "error" => "game not found"]);
    }

    //Register points for PrediGivrees
    function registerPGPoints(Request $request) {
        $inputs = $request->all();
        $streamId = $inputs['streamId'];
        $players = $inputs['players'];
        if(!is_array($players))
            return response()->json(['error' => 'users must be an array'], 400);

        foreach($players as $player) {
            User::registerOrUpdateUser($player['userId'], $player['userName']);
            $pgPoints = PredigivrePoints::where('user_id', $player['userId'])->where('stream_id', $streamId)->first();
            if($pgPoints == null) {
                PredigivrePoints::insert([
                    "user_id" => $player['userId'],
                    "points" => $player['points'],
                    "stream_id" => $streamId,
                    "created_at" => now(),
                    "updated_at" => now()
                ]);

                continue;
            }

            $newPoints = $pgPoints->points + $player['points'];
            $pgPoints->update([
                'points' => $newPoints,
                "updated_at" => now()
            ]);
        }

        PredigivreHistory::insert([
            "streamId" => $inputs['streamId'],
            "win_position" => $inputs['posWin'],
            "most_choice_position" => $inputs['posMostChoice'],
            "map" => json_encode($inputs['map']),
            "created_at" => now()
        ]);

        return response()->json(["state" => "success"]);

    }
}
