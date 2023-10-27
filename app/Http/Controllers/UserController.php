<?php

namespace App\Http\Controllers;

use App\Models\VipGamePoint;
use DB;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    
    public function getUserIcon(Request $request, $twitch_id)
    {
        if (Storage::disk('public')->exists('/penguins/'.$twitch_id .'.png'))
            $img =  Storage::disk('public')->get('/penguins/'.$twitch_id.'.png');
        else
            $img = Storage::disk('public')->get('/penguins/default.png');
        return response($img)->header('Content-type','image/png');
    }

    public function getUserVIPGamesPoints(Request $request, $twitch_id) {
        $points = DB::table('vipgames_points')
                        ->select(DB::raw('user_id, count(user_id) as points'))
                        ->where('user_id', $twitch_id)
                        ->groupBy('user_id')
                        ->get();
        return response()->json($points);
    }

    public function getUserListVIPGamesPoints(Request $request) {
        $input = $request->all();
        if(!isset($input['users']))
            return response()->json(['error' => 'users must be set'], 400);

        $users = $input['users'];
        if(!is_array($users))
            return response()->json(['error' => 'users must be an array'], 400);

        $points = DB::table('vipgames_points')
                        ->select(DB::raw('user_id, count(user_id) as points'))
                        ->whereIn('user_id', $users)
                        ->groupBy('user_id')
                        ->get();
        return response()->json($points);
    }

}
