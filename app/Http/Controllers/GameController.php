<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    //

    public function vip_games()
    {
        return Inertia::location($this->twitch->getOAuthAuthorizeUrl('code', ['user_read']));
    }

    public function mario_kart()
    {
        return Inertia::location($this->twitch->getOAuthAuthorizeUrl('code', ['user_read']));
    }
}
