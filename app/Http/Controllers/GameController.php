<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GameController extends Controller
{
    //

    public function show($game)
    {
        if($game == 'vipgames')
            return Inertia::render('Games/VipGames');
        else if($game == 'predi_grivee')
            return Inertia::render('Games/PrediGivree');

        return Inertia::render('Games/VipGames');
    }
}
