<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenguinCard extends Model
{
    use HasFactory;

    protected $table = "penguin_card";

    public static function getCardFromTWID($userId) {
        $penguinCard = PenguinCard::where('user_id', $userId)->first();
        if($penguinCard == null) return null;
        $penguinCard->background_data = json_decode($penguinCard->background_data, true);
        return $penguinCard;
    }
}
