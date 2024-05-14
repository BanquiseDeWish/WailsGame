<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cosmetic;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class CosmeticController extends Controller
{
    public function getCosmetics(Request $request)
    {
        $inputs = $request->query();
        if (!isset($inputs['type']))
            return response()->json(["error" => "No type provided", "inputs" => $inputs]);
        $typeCosmetic = $inputs['type'];

        if (!isset($inputs['sub_type']))
            return response()->json(["error" => "No sub type provided"]);
        $subTypeCosmetic = $inputs['sub_type'];

        $cosmetics = Cosmetic::where('type', $typeCosmetic)->where('sub_type', $subTypeCosmetic)->get();
        foreach ($cosmetics as $cosmetic) {
            $cosmetic->data = json_decode($cosmetic->data, true);
        }
        return response()->json($cosmetics);
    }

    public function getUserCosmetics(Request $request, $twitch_id)
    {

        $inputs = $request->query();
        $type = null;
        $subType = null;
        if (isset($inputs['type']))
            $type = $inputs['type'];
        if (isset($inputs['sub_type']))
            $subType = $inputs['sub_type'];

        // Check if the user exists
        $user = User::where('twitch_id', $twitch_id)->first();
        if ($user == null)
            return response()->json(['error' => 'User not found']);

        // Get the cosmetics for the user
        $cosmetics = DB::table('users__cosmetics')->join('cosmetics', 'users__cosmetics.cosmetic_id', '=', 'cosmetics.id')->select('cosmetics.*')->where('users__cosmetics.user_id', $user->id);
        if ($type != null)
            $cosmetics = $cosmetics->where('cosmetics.type', $type);
        if ($subType != null)
            $cosmetics = $cosmetics->where('cosmetics.sub_type', $subType);
        $cosmetics = $cosmetics->get();

        // Return the cosmetics
        if ($cosmetics == null || count($cosmetics) == 0 && ($type != null || $subType != null))
            return response()->json(['error' => 'No cosmetics found for this user with this type and sub type']);
        if ($cosmetics == null || count($cosmetics) == 0)
            return response()->json(['error' => 'No cosmetics found for this user']);

        foreach ($cosmetics as $cosmetic) {
            $cosmetic->data = json_decode($cosmetic->data, true);
        }

        return response()->json($cosmetics);
    }

    public static function getUserActiveCosmetics($twitch_id)
    {
        $user = User::where('twitch_id', $twitch_id)->first();
        if ($user == null)
            return response()->json(['error' => 'User not found']);

        $activePenguin = User::getActivePenguin($twitch_id);
        if ($activePenguin == null)
            return response()->json(['error' => 'No active penguin found for this user']);

        $penguinCosmeticsId = DB::table('users__penguin')->where('id', $activePenguin)->first();
        $cardCosmeticsId = DB::table('users__card')->where('user_id', $user->id)->first();
        if ($penguinCosmeticsId == null && $cardCosmeticsId == null)
            return response()->json([]);

        $mergedCosmeticsId = [];
        if ($penguinCosmeticsId != null)
            $mergedCosmeticsId = array_merge($mergedCosmeticsId, explode(',', $penguinCosmeticsId->active_cosmetics));
        if ($cardCosmeticsId != null)
            $mergedCosmeticsId = array_merge($mergedCosmeticsId, explode(',', $cardCosmeticsId->active_cosmetics));

        $cosmetics = DB::table('cosmetics')->whereIn('id', $mergedCosmeticsId)->get();
        foreach ($cosmetics as $cosmetic) {
            $cosmetic->data = json_decode($cosmetic->data, true);
        }
        return response()->json($cosmetics);
    }
}
