<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{

    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [];

    // Method to get amount of points ( count userId in vipgames_points table)
    public function getPoints() {

    }

    public static function registerOrUpdateUser($userId, $userInfo) {
        $user = User::where('twitch_id', $userId)->first();
        if($user) {
            $user->twitch_username = $userInfo->data[0]->display_name;
            $user->save();
        } else {
            $user = new User;
            $user->twitch_id = $userId;
            $user->twitch_username = $userInfo->data[0]->display_name;
            $user->save();
        }
    }
    
    use HasFactory;
}