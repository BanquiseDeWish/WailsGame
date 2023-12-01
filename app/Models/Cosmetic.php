<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cosmetic extends Model
{
    use HasFactory;

    protected $table = "cosmetic";

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
}
