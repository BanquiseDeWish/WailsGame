<?php

namespace App\Http\Controllers;

use App\Models\Cosmetic;
use App\Models\PenguinCard;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;
use Inertia\Inertia;

class AppareanceController extends Controller
{

    public function index(Request $request) {
        $twitch_id = $request->session()->get('twitch')->id;
        $penguinCard = PenguinCard::getCardFromTWID($twitch_id);
        $activeCosmetics = Cosmetic::getCosmeticsActiveUser($twitch_id);
        return Inertia::render('Profile/Appearance', [
            'penguinCard' => $penguinCard,
            'activeCosmetics' => $activeCosmetics
        ]);
    }

    public function getCosmetics(Request $request) {
        $inputs = $request->all();
        $typeCosmetic = $inputs['type'];
        $subTypeCosmetic = $inputs['sub_type'];
        $cosmetics = Cosmetic::where('type', $typeCosmetic)->where('sub_type', $subTypeCosmetic)->get();
        return response()->json($cosmetics);
    }

    public function save(Request $request) {
        $inputs = $request->all();


        foreach ($inputs as $cosmetic) {
            $id = $cosmetic['id'];
            $type = $cosmetic['type'];
            $subType = $cosmetic['sub_type'];
            $userId = $request->session()->get('twitch')->id;

            $model = null;

            //Check Type
            switch ($type) {
                //Load Model PenguinCad
                case 'card':
                    $model = new PenguinCard();
                    break;
                default:
                    break;
            }

            //check if user exists
            $userCosm = $model->where('user_id', $userId)->first();
            if($userCosm !== null) {
                //Update cosm
                if($subType == "colorIcon")
                    $userCosm->update([
                        'bubble_color' => $id
                    ]);
            }else{
                //Inset cosm
                $model->create([
                    'user_id' => $userId
                ]);
            }
        }

        /**/

        return response()->json($inputs);
    }

}
