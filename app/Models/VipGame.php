<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class VipGame extends Model
{
    protected $table = 'vipgames_history';

    public static function register($winnerId, $winningTicket, $numberOfTickets, $streamId, $stats) {
        $vipgame = new VipGame;
        $vipgame->winner_id = $winnerId;
        $vipgame->winning_ticket = $winningTicket;
        $vipgame->number_of_tickets = $numberOfTickets;
        $vipgame->stream_id = $streamId;
        $vipgame->stats = $stats;
        $vipgame->save();
        return $vipgame;
    }

    public static function registerOrUpdate($winnerId, $winningTicket, $numberOfTickets, $streamId, $stats) {
        $vipgame = VipGame::where('stream_id', $streamId)->first();
        if ($vipgame) {
            $vipgame->winner_id = $winnerId;
            $vipgame->winning_ticket = $winningTicket;
            $vipgame->number_of_tickets = $numberOfTickets;
            $vipgame->stream_id = $streamId;
            $vipgame->stats = $stats;
            $vipgame->save();
            return $vipgame;
        } else {
            return VipGame::register($winnerId, $winningTicket, $numberOfTickets, $streamId, $stats);
        }
    }

    public static function getVipGame($id) {
        return VipGame::where('id', $id)->first();
    }

    public static function getVipGameFromStreamId($streamId) {
        return VipGame::where('stream_id', $streamId)->first();
    }

    use HasFactory;
}
