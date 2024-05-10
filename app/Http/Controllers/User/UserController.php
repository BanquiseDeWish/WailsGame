<?php

namespace App\Http\Controllers;

use App\Models\VipGamePoint;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\VipGame;
use App\Models\Stream;



class UserController extends Controller
{

    public function getUserIcon(Request $request, $twitch_id)
    {
        if (Storage::disk('public')->exists('/penguins/' . $twitch_id . '.png'))
            $img = Storage::disk('public')->get('/penguins/' . $twitch_id . '.png');
        else
            $img = Storage::disk('public')->get('/penguins/default.png');
        return response($img)->header('Content-type', 'image/png');
    }

    public function getUserVIPGamesPoints(Request $request, $twitch_id)
    {
        # points without bonus
        $userPoint = DB::table('vipgames_points')
            ->select(DB::raw('user_id, count(user_id) as points'))
            ->where('user_id', $twitch_id)
            ->groupBy('user_id')
            ->get();

        if(count($userPoint) == 0)
            return response()->json(['user_id' => $twitch_id, 'points' => 0, 'bonus' => false]);

        $userPoint = $userPoint[0];
        $lastVipGame = VipGame::orderBy('created_at', 'desc')->first();
        if ($lastVipGame == null)
            return response()->json($userPoint);
        $streamCount = Stream::where('started_at', '>', $lastVipGame->created_at)->count();
        if ($userPoint->points == $streamCount) {
            $userPoint->points = $userPoint->points + 2;
            $userPoint->bonus = true;
        } else {
            $userPoint->bonus = false;
        }

        return response()->json($userPoint);
    }

    public function getUserListVIPGamesPoints(Request $request)
    {
        $input = $request->all();
        if (!isset($input['users']))
            return response()->json(['error' => 'users must be set'], 400);

        $users = $input['users'];
        if (!is_array($users))
            return response()->json(['error' => 'users must be an array'], 400);

        $userPoints = DB::table('vipgames_points')
            ->select(DB::raw('user_id, count(user_id) as points'))
            ->whereIn('user_id', $users)
            ->groupBy('user_id')
            ->get();

        $lastVipGame = VipGame::orderBy('created_at', 'desc')->first();
        if ($lastVipGame == null)
            return response()->json($userPoints);
        $streamCount = Stream::where('started_at', '>', $lastVipGame->created_at)->count();
        foreach ($userPoints as $point) {
            if ($point->points == $streamCount) {
                $point->points = $point->points + 2;
                $point->bonus = true;
            } else {
                $point->bonus = false;
            }
        }

        return response()->json($userPoints);
    }

    public function registerUsersVipGamesPoints(Request $request)
    {
        $input = $request->all();
        if (!isset($input['users']))
            return response()->json(['error' => 'users must be set'], 400);
        if (!isset($input['stream_id']))
            return response()->json(['error' => 'stream_id must be set'], 400);

        $users = $input['users'];
        if (!is_array($users))
            return response()->json(['error' => 'users must be an array'], 400);

        $streamId = $input['stream_id'];

        $dataToInsert = [];
        foreach ($users as $userId) {
            $dataToInsert[] = [
                'user_id' => $userId,
                'stream_id' => $streamId,
            ];
        }
        if (count($dataToInsert) > 0) {
            DB::table('vipgames_points')->insert($dataToInsert);
        }
        return response()->json(['success' => true]);
    }
}
