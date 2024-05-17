<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cosmetic;
use App\Models\User;
use Illuminate\Contracts\Database\Query\Builder;
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

    /**
     * Get all cosmetics a user has
     */
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

    /**
     * Get the active cosmetics for a user
     */
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

    /**
     * Get the active cosmetics for a list of users
     */
    public static function getUsersActiveCosmetics(Request $request)
    {
        $inputs = $request->all();
        if(!isset($inputs['twitch_ids']))
            return response()->json(['error' => 'No twitch_ids provided']);

        $users = $inputs['twitch_ids'];

        if (!is_array($users))
            return response()->json(['error' => 'twitch_ids must be an array'], 400);
        if(count($users) == 0)
            return response()->json(['error' => 'No twitch_ids provided']);
        $usersCosmeticsId = DB::table('users')
            ->leftJoin('users__penguin', 'users.active_penguin', '=', 'users__penguin.id')
            ->leftJoin('users__card', 'users.id', '=', 'users__card.user_id')
            ->whereIn('users.twitch_id', $users)
            ->select('users.twitch_id', DB::raw("CONCAT(COALESCE(users__penguin.active_cosmetics, ''), ',', COALESCE(users__card.active_cosmetics, '')) AS cosmetics"))->get();
        
        $usersCosmeticIds = [];
        $cosmeticIds = [];
        foreach ($usersCosmeticsId as $userCosmeticsId) {
            $usersCosmeticIds[$userCosmeticsId->twitch_id] = array_filter(explode(',', $userCosmeticsId->cosmetics));
            $cosmeticIds = array_merge($cosmeticIds, explode(',', $userCosmeticsId->cosmetics));
        }
        array_filter(array_unique($cosmeticIds));
        $cosmetics = DB::table('cosmetics')->whereIn('id', $cosmeticIds)->get();
        foreach ($cosmetics as $cosmetic) {
            $cosmetic->data = json_decode($cosmetic->data, true);
        }
        return response()->json(["cosmetics" => $cosmetics, "users" => $usersCosmeticIds]);
    }
}
