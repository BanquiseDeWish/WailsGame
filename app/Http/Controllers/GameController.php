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
            return Inertia::render('Games/VipGamesIndex');
        else if($game == 'predi_grivee')
            return Inertia::render('Games/PrediGivreeIndex');

        return Inertia::render('Games/VipGamesIndex');
    }

    public function play(Request $request, $game)
    {
        if($game == 'vipgames')
            return Inertia::render('Games/Play/VipGame', ['get'=>$request->all()]);
        else if($game == 'predi_grivee')
            return Inertia::render('Games/PrediGivreeIndex');

        return Inertia::render('Games/Play/VipGame', ['get'=>$request->all()]);
    }
}
