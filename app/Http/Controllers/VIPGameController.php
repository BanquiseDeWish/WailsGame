<?php

namespace App\Http\Controllers;

use App\Models\VipGame;
use Illuminate\Http\Request;

class VIPGameController extends Controller
{
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
        $stats = [];
        $gameTime = [];
        foreach ($vipgames as $vipgame) {
            $vipgameStats = json_decode($vipgame->stats);
            if($vipgameStats['startGame']) {

            }
        }
    }
}
