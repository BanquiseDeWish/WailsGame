<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Cosmetic extends Model
{
    use HasFactory;

    protected $table = "cosmetics";

    public $timestamps = false;

    public static function getStyle($id) {
        $cosm = Cosmetic::select('id', 'style')->where('id', $id)->first();
        return $cosm;
    }

    public static function getCosmetic($id) {
        return Cosmetic::where('id', $id)->first();
    }

    public static function getCosmeticsForType($type) {
        return Cosmetic::where('type', $type)->get();
    }

    public static function getCosmeticsForTypeAndSubType($type, $subType) {
        return Cosmetic::where('type', $type)->where('sub_type', $subType)->get();
    }

    public static function getUserActiveCosmetics($twitch_id)
    {
        $user = User::where('twitch_id', $twitch_id)->first();
        if ($user == null)
            return [];

        $activePenguin = User::getActivePenguin($twitch_id);
        if ($activePenguin == null)
            return [];

        $penguinCosmeticsId = DB::table('users__penguin')->where('id', $activePenguin)->first();
        $cardCosmeticsId = DB::table('users__card')->where('user_id', $user->id)->first();
        if ($penguinCosmeticsId == null && $cardCosmeticsId == null)
            return [];

        $mergedCosmeticsId = [];
        if ($penguinCosmeticsId != null)
            $mergedCosmeticsId = array_merge($mergedCosmeticsId, explode(',', $penguinCosmeticsId->active_cosmetics));
        if ($cardCosmeticsId != null)
            $mergedCosmeticsId = array_merge($mergedCosmeticsId, explode(',', $cardCosmeticsId->active_cosmetics));

        $cosmetics = DB::table('cosmetics')->whereIn('id', $mergedCosmeticsId)->get();
        return $cosmetics;
    }
}
