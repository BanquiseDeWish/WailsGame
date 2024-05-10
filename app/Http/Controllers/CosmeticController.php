<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cosmetic;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CosmeticController extends Controller
{
    public function getCosmetics(Request $request) {
        $inputs = $request->all();
        if(!isset($inputs['type']))
            return response()->json(["error" => "No type provided", "inputs" => $inputs]);
        $typeCosmetic = $inputs['type'];

        if(!isset($inputs['sub_type']))
            return response()->json(["error" => "No sub type provided"]);
        $subTypeCosmetic = $inputs['sub_type'];

        $cosmetics = Cosmetic::where('type', $typeCosmetic)->where('sub_type', $subTypeCosmetic)->get();
        return response()->json($cosmetics);
    }

    public function getUserCosmetics(Request $request) {
        $inputs = $request->all();
        if(!isset($inputs['user_id']))
            return response()->json(["error" => "No user id provided"]);

        $id = $inputs['user_id'];

        $cosmetics = DB::table('users__cosmetics')->select('cosmetic_id')->where('user_id', $id)->get();
        return response()->json($cosmetics);
    }

    public static function getUserActiveCosmetics(Request $request, $twitch_id) {
        $activePenguin = User::getActivePenguin($twitch_id);
        if($activePenguin == null)
            return response()->json([]);

        $cosmeticsId = DB::table('users__penguin')->where('id', $activePenguin)->first();
        if($cosmeticsId == null)
            return response()->json([]);

        $cosmeticsId = explode(',', $cosmeticsId->active_cosmetics);
        $cosmetics = DB::table('cosmetics')->whereIn('id', $cosmeticsId)->get();
        return response()->json($cosmetics);
    }
}
