<?php

namespace App\Http\Controllers;

use App\Models\PenguinCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{


    public function index(Request $request) {
        return Inertia::render('Profile/Index', [

        ]);
    }

    public function appearance(Request $request) {
        $penguinCard = PenguinCard::getCardFromTWID($request->session()->get('twitch')->id);
        return Inertia::render('Profile/Appearance', [
            'penguinCard' => $penguinCard
        ]);
    }


}
