<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GameStat extends Model
{
    use HasFactory;

    protected $table = 'game_stats';

    public static function getStat($name) {
        return GameStat::where('stat_name', $name)->first();
    }

    public static function getGameStats($game) {
        $stats = GameStat::where('game_id', $game->id)->get();
        $statsArray = [];
        foreach ($stats as $stat) {
            $statsArray[$stat->stat_name] = $stat->stat_value;
        }
        return $statsArray;
    }

    public static function updateStat($game, $statName, $value) {
        $stat = GameStat::where('stat_name', $statName)->first();
        if ($stat) {
            $stat->stat_value = $value;
            $stat->save();
        } else {
            $stat = new GameStat;
            $stat->game = $game;
            $stat->stat_name = $statName;
            $stat->stat_value = $value;
            $stat->save();
        }
    }
}
