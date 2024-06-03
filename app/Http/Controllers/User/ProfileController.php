<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User\UserCard;
use App\Models\User;
use App\Models\Payments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProfileController extends Controller
{


    public function index(Request $request) {
        $user = User::getFromID($request->session()->get('twitch')->id)->first();
        $payments = Payments::getArticlesUserPayedWithDetails($user->id);
        return Inertia::render('Profile/Index', [
            'user' => $user,
            'payments' => $payments
        ]);
    }

    public function appearance(Request $request) {
        $penguinCard = UserCard::getCardFromTWID($request->session()->get('twitch')->id);
        return Inertia::render('Profile/Appearance', [
            'penguinCard' => $penguinCard
        ]);
    }


}
