<?php

namespace App\Models\User;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCard extends Model
{
    use HasFactory;

    protected $table = "users__card";

    public static function getCardFromTWID($userId) {
        $penguinCard = UserCard::where('user_id', $userId)->first();
        if($penguinCard == null) return null;
        $penguinCard->background_data = json_decode($penguinCard->background_data, true);
        return $penguinCard;
    }
}
