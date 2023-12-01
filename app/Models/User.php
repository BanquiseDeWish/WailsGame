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
    public function getVIPGamePoints() {
        $bonus = 2;
        $streamCount = Stream::count();
        $points = VipGamePoint::where('user_id', $this->twitch_id)->count();

        return $points == $streamCount ? $points + $bonus : $points;
    }

    public static function getFromID($uid) {
        return User::where('twitch_id', $uid)->first();
    }

    public static function registerOrUpdateUser($userId, $userName) {
        $user = User::getFromID($userId);
        if($user) {
            $user->twitch_username = $userName;
            $user->save();
        } else {
            $user = new User;
            $user->twitch_id = $userId;
            $user->twitch_username = $userName;
            $user->save();
        }
        return $user;
    }

    public static function getActivePenguin($userId) {
        $user = User::getFromID($userId);
        if($user == null)
            return null;
        return $user->active_penguin;
    }

    use HasFactory;
}
