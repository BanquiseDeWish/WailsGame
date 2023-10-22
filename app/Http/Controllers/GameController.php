<?php

namespace App\Http\Controllers;

use App\Models\PredigivrePoints;
use App\Models\VipGamePoint;
use Illuminate\Http\Request;

use App\Models\User;

use Inertia\Inertia;

class GameController extends Controller
{
    //

    public function show($game)
    {
        if($game == 'vipgames')
            return Inertia::render('Games/VipGamesIndex');
        else if($game == 'predi_grivee')
            return Inertia::render('Games/PrediGivreeIndex');

        return Inertia::render('Games/VipGamesIndex');
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
        $userId = $inputs['userId'];
        $userName = $inputs['userName'];

        $pgPoints = PredigivrePoints::where('userId', $userId)->first();
        if($pgPoints == null) {
            PredigivrePoints::insert([
                "userId" => $userId,
                "userName" => $userName,
                "points" => env('PREDIGIVRE_POINTS'),
                "created_at" => now(),
                "updated_at" => now()
            ]);

            return response()->json(["state" => "success"]);
        }

        $newPoints = $pgPoints->points + env('PREDIGIVRE_POINTS');
        $pgPoints->update([
            'userName' => $userName,
            'points' => $newPoints,
        ]);


        return response()->json(["state" => "success"]);

    }

    //HallOfFame for PrediGivrees
    public function hallOfFamePredigivre(Request $request)
    {
        $hallOfFame = PredigivrePoints::limit(10)->get();
        return Inertia::render('Games/PrediGivreeIndex', ['hallOfFame' => $hallOfFame]);
    }
}
