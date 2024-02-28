<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TierlistCategories;
use App\Models\TierlistCategoryRating;
use App\Models\TierlistItems;
use App\Models\TierlistShare;
use App\Models\User;
use Inertia\Inertia;
use Carbon\Carbon;

class TierlistController extends Controller
{

    public function index(Request $request) {
        $user = $request->session()->get('twitch');
        $tierlist = TierlistCategories::get();
        $tlShare = TierlistShare::getTLSFromUser($user->id);
        return Inertia::render('Tierlist/Index', ['tierlist' => $tierlist, 'tlShare' => $tlShare]);

    }

    public function play(Request $request, $id, $tls_id = "new") {
        $user = $request->session()->get('twitch');
        $tierlist = TierlistCategories::where('id', $id)->first();
        if($tierlist == null) return abort(404);

        $items = TierlistItems::where('category_id', $tierlist->id)->get();
        $categoriesRating = TierlistCategoryRating::where('category_id', $tierlist->id)->get();

        $tlShare = null;
        if($tls_id !== "new") {
            $tlShare = TierlistShare::where('id', $tls_id)->where('category_id', $id)->first();
            if($tlShare == null) return redirect()->route('tierlist.play', ['id' => $id, 'tls_id' => 'new'])->with('status', $this->toastResponse('error', 'Impossible de trouver cette tierlist'));
            if($tlShare->user_id !== intval($user->id)) return redirect()->route('tierlist.play', ['id' => $id, 'tls_id' => 'new'])->with('status', $this->toastResponse('error', 'Vous n\'êtes pas autorisé à voir cette page.'));
        }

        return Inertia::render('Tierlist/Play', ['tierlist' => $tierlist, 'idc' => $id, 'items' => $items, 'tlsIDQuery' => $tls_id, 'tlShare' => $tlShare, 'categoriesRating' => $categoriesRating]);
    }

    public function share(Request $request) {
        $inputs = $request->all();
        $user = $request->session()->get('twitch');
        $tl_id = $inputs["category_id"];
        $name = "Sans titre";
        if(isset($inputs["name"])) $name = $inputs["name"];
        $tlsID = null;
        if(isset($inputs["tls_id"])) $tlsID = $inputs["tls_id"];
        $data = $inputs["data"];


        $tlShare = TierlistShare::where('category_id', $tl_id)->where('id', $tlsID)->first();
        if($tlShare !== null)
            if($tlShare->user_id !== intval($user->id))
                return response()->json(["status" => "error", "message" => "Vous n'êtes pas autorisé à éditer cette tierlist."]);
        if(strlen($name) > 250) {
            return response()->json(["status" => "error", "message" => "Le nom de la tierlist ne peut dépasser les 250 caractères"]);
        }
        if($name !== "Sans titre"){
            $checkName = TierlistShare::where('name', $name)->where('category_id', $tl_id)->where('id', '!=', $tlsID)->where('user_id', $user->id)->first();
            if($checkName !== null) return response()->json(["status" => "error", "message" => "Une tierlist de cette catégorie porte déjà ce nom"]);
        }
        if($tlShare == null) {
            $tlShare = new TierlistShare();
            $tlShare->user_id = $user->id;
            $tlShare->name = $name;
            $tlShare->category_id = $tl_id;
            $tlShare->data = json_encode($data);
            $tlShare->created_at = Carbon::now();
            $tlShare->save();
        }else {
            $tlShare->update([
                'name' => $name,
                'data' => $data
            ]);
        }


        return response()->json(["status" => "success", "message" => "Sauvegarde de la Tierlist avec succès", "tls" => $tlShare]);
    }

    public function view(Request $request, $userid, $id) {
        $tlShare = TierlistShare::where('id', $id)->where('user_id', $userid)->first();
        if($tlShare == null) return abort(404);

        $tierlist = TierlistCategories::where('id', $tlShare->category_id)->first();
        if($tierlist == null) return abort(404);

        $items = TierlistItems::where('category_id', $tierlist->id)->get();
        $categoriesRating = TierlistCategoryRating::where('category_id', $tierlist->id)->get();

        $user = User::select('twitch_id', 'twitch_username')->where('twitch_id', $tlShare->user_id)->first();

        return Inertia::render('Tierlist/View', ['tierlist' => $tierlist, 'items' => $items, 'idc' => $tierlist->id, 'categoriesRating' => $categoriesRating, 'user' => $user, 'tlShare' => $tlShare]);
    }

    public function delete(Request $request) {
        $inputs = $request->all();
        $user = $request->session()->get('twitch');
        if(!isset($inputs['tlsid'])) return response()->json(["status" => "error", "message" => "TLS_ID is required."]);
        $tlsID = $inputs['tlsid'];
        $tlShare = TierlistShare::where('id', $tlsID)->first();
        if($tlShare == null) return response()->json(["status" => "error", "message" => "TLS Share is not found"]);
        if($tlShare->user_id !== intval($user->id)) return response()->json(["status" => "error", "message" => "Impossible de supprimer, vous n'êtes pas autorisé."]);
        $tlShare->delete();

        $newListTLShare = TierlistShare::getTLSFromUser($user->id);

        return response()->json(["status" => "success", "message" => "Supprimé avec succès", "tlShare" => $newListTLShare]);
    }


}
