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
}
