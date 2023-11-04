<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VipGame extends Model
{
    protected $table = 'vipgames_history';

    public static function register() {
        $vipgame = new VipGame;
        $vipgame->save();
        return $vipgame;
    }

    use HasFactory;
}
