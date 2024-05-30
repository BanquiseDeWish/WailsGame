<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Cosmetic;
use App\Models\CosmeticsTabs;
use App\Models\Payments;
use App\Models\User;
use App\Models\User\UserCosmetics;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class ShopController extends Controller
{

    public function index(Request $request, $state = "", $payment_id = "") {
        $tabs = [];
        $tabsParent = CosmeticsTabs::where('parent', '=', null)->get();
        foreach($tabsParent as $tab) {
            $tab->subtabs = CosmeticsTabs::where('parent', '=', $tab->id)->where('active', '=', 1)->get();
            array_push($tabs, $tab);
        }
        $payment_data = null;
        if($state == "success" && $payment_id !== "") {
            $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
            $payment_data = Payments::select('id', 'created_at', 'cart', 'amount', 'currency')->where('payment_status', 'approved')->where('payment_id', $payment_id)->where('payer_userid', $user->id)->first();
            if($payment_data !== null) {
                $payment_data_cart = json_decode($payment_data->cart, true);
                $cart_details = [];
                foreach($payment_data_cart as $cart) {
                    array_push($cart_details, Articles::select('id', 'name', 'price')->where('id', $cart)->first());
                }
                $payment_data->cart_details = $cart_details;
            }
        }
        return Inertia::render('Shop/Index', ['tabs'=>$tabs,"state"=>$state,"payment_data"=>$payment_data]);
    }

    public function articles(Request $request, $tab_id) {
        $articles = Articles::where('tab', '=', $tab_id)->where('enable', '=', 1)->get();
        foreach($articles as $article) {
            $cosmetics = json_decode($article->cosmetics, true);
            $article->cosmetics = Cosmetic::whereIn('id', $cosmetics)->get();
            foreach($article->cosmetics as $cosmetic) {
                $cosmetic->data = json_decode($cosmetic->data, true);
            }
        }
        return response()->json($articles);
    }

    public function claim_free(Request $request) {
        $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
        $article_id = $request->input('article_id');
        if(!isset($article_id)) return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Vous devez spécifier un identifiant d'article"));
        $article = Articles::where('id', '=', $article_id)->where('price', '<=', 0)->where('enable', '=', 1)->first();
        if($article == null) return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "L'article spécifier est introuvable"));
        $paymentCheck = Payments::where('payer_userid', $user->id)->where('cart', '=', json_encode([$article_id]))->first();
        if($paymentCheck !== null) return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Vous avez déjà claim cet article."));
        $cosmeticsCheck = json_decode($article->cosmetics, true);
        foreach($cosmeticsCheck as $cosmetic) {
            $itemExist = DB::table('users__cosmetics')->where('user_id', $user->id)->where('cosmetic_id', $cosmetic)->first();
            if($itemExist == null){
                $uc = new UserCosmetics;
                $uc->user_id = $user->id;
                $uc->cosmetic_id = $cosmetic;
                $uc->payment_id = -1;
                $uc->save();
            }
        }

        $payment = new Payments;
        $payment->payment_id = "";
        $payment->payer_userid = $user->id;
        $payment->payer_email = "";
        $payment->payer_type = "free";
        $payment->cart = json_encode([$article_id]);
        $payment->amount = strval(0);
        $payment->currency = "EUR";
        $payment->payment_status = "approved";
        $payment->save();

        return redirect()->route('shop.index')->with("status", $this->toastResponse('success', "Vous avez bien récupérer les cosmétiques liés à cet article"));
    }


    public function cart(Request $request) {
        $list = $request->input('cart');
        $articles = Articles::select('id', 'name', 'price', 'promo', 'tab')->whereIn('id', $list)->where('enable', 1)->get();
        foreach($articles as $article) {
            $article->tab = CosmeticsTabs::where('id', $article->tab)->first();
        }
        return response()->json($articles);
    }

}
