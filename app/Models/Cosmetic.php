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

    public static function getCosmeticsActiveUser($twitch_id) {
        $activePenguin = User::getActivePenguin($twitch_id);
        if($activePenguin == null)
            return [];

        $cosmeticsId = DB::table('users__penguin')->where('id', $activePenguin)->first();
        if($cosmeticsId == null)
            return [];

        $cosmeticsId = explode(',', $cosmeticsId->active_cosmetics);
        $cosmetics = DB::table('cosmetic')->whereIn('id', $cosmeticsId)->get();

        return $cosmetics;
    }
}
