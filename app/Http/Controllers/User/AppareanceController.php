<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Cosmetic;
use App\Models\User;
use App\Models\User\UserCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class AppareanceController extends Controller
{

    public function index(Request $request) {
        $twitch_id = $request->session()->get('twitch')->id;
        $penguinCard = UserCard::getCardFromTWID($twitch_id);
        $activeCosmetics = Cosmetic::getUserActiveCosmetics($twitch_id);
        foreach($activeCosmetics as $cosmetic) {
            $cosmetic->data = json_decode($cosmetic->data, true);
        }
        return Inertia::render('Profile/Appearance', [
            'penguinCard' => $penguinCard,
            'activeCosmetics' => $activeCosmetics
        ]);
    }

    public function save(Request $request) {
        $inputs = $request->all();
    
        if(!isset($inputs['cosmetics']))
            return response()->json(["error" => "No cosmetics provided"]);
        $twitch_id = $request->session()->get('twitch')->id;
        $user = User::where('twitch_id', $twitch_id)->first();
        if($user == null)
            return response()->json(['error' => 'User not found']);

        $cosmetics = DB::table('users__cosmetics')->join('cosmetics', 'users__cosmetics.cosmetic_id', '=', 'cosmetics.id')->whereIn('cosmetics.id', $inputs['cosmetics'])->get();
        if($cosmetics->count() != count($inputs['cosmetics']))
            return response()->json(['error' => 'Some cosmetics do not exist or are not available for you']);

        $penguinActiveCosmetics = [];
        $cardActiveCosmetics = [];
        foreach($cosmetics as $cosmetic) {
            if($cosmetic->type == 'penguin') {
                array_push($penguinActiveCosmetics, $cosmetic->id);
            }
            else {
                array_push($cardActiveCosmetics, $cosmetic->id);
            }
        }

        DB::table('users__card')->updateOrInsert(['user_id' => $user->id], ['active_cosmetics' => implode(',', $cardActiveCosmetics)]);
        DB::table('users__penguin')->updateOrInsert(['user_id' => $user->id], ['active_cosmetics' => implode(',', $penguinActiveCosmetics)]);

        return response()->json(['success' => 'Cosmetics saved']);
    }

}
