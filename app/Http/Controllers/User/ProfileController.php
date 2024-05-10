<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\UserCard;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{


    public function index(Request $request) {
        return Inertia::render('Profile/Index', [

        ]);
    }

    public function appearance(Request $request) {
        $penguinCard = UserCard::getCardFromTWID($request->session()->get('twitch')->id);
        return Inertia::render('Profile/Appearance', [
            'penguinCard' => $penguinCard
        ]);
    }


}
