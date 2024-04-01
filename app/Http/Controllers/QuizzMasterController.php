<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizzMasterController extends Controller
{

    public function index()
    {
        return Inertia::render('Tools/Quizz/Index', []);
    }

    public function party($gameId)
    {
        return Inertia::render('Tools/Quizz/Quizz', ['gameId' => $gameId]);
    }

}
