<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
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
        $articles = [];
        if($tab_id == -1) {
            $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
            $cosmetics = Cosmetic::where('free', 0)->where('claimable', 1)->get();
            $articles = [];
            foreach($cosmetics as $cosmetic) {
                $userCheck = UserCosmetics::where('user_id', $user->id)->where('cosmetic_id', $cosmetic->id)->first();
                if($userCheck !== null) continue;
                $cosmetics_data = Cosmetic::where('id', $cosmetic->id)->get();
                foreach($cosmetics_data as $cos) {
                    $cos->data = json_decode($cos->data, true);
                }
                $fakeArticle = new Articles();
                $fakeArticle->id = -1;
                $fakeArticle->uuid = Str::uuid();
                $fakeArticle->name = $cosmetic->name;
                $fakeArticle->price = 0;
                $fakeArticle->cosmetics = $cosmetics_data;
                $fakeArticle->description = "";
                $fakeArticle->promo = 0;
                $fakeArticle->tab = -1;
                $fakeArticle->enable = 1;
                $fakeArticle->limited_at = null;
                array_push($articles, $fakeArticle);
            }
        }else{
            $articles = Articles::where('tab', '=', $tab_id)->where('enable', '=', 1)->get();
            foreach($articles as $article) {
                //CHECK LIMITED AT
                if($article->limited_at !== null) {
                    $dateToCheck = $article->limited_at;
                    $checkDate = new \DateTime($dateToCheck);
                    $currentDate = new \DateTime();
                    if ($checkDate < $currentDate) {
                        $article->limited_at = "UI";
                        $idRemove = $article->id;
                        $keyToRemove = $articles->search(function ($object) use ($idRemove) {
                            return $object->id == $idRemove;
                        });
                        if ($keyToRemove !== false)
                            $articles->forget($keyToRemove);
                    }
                }

                $article->price_sub = 0;
                if($article->price > 0 && $article->tab == 10 || $article->tab == 11) {
                    $articles_sub = json_decode($article->cosmetics, true);
                    $price_sub_articles = 0;
                    $all_find = true;
                    foreach($articles_sub as $asub) {
                        $article_get = Articles::where('cosmetics', "[".$asub."]")->first();
                        if($article_get == null) {
                            $all_find = false;
                            break;
                        }
                        $price_sub_articles += $article_get->price;
                    }
                    if($all_find) {
                        $article->price_sub = $price_sub_articles;
                    }

                }

                $cosmetics = json_decode($article->cosmetics, true);
                $article->cosmetics = Cosmetic::whereIn('id', $cosmetics)->get();
                foreach($article->cosmetics as $cosmetic) {
                    $cosmetic->data = json_decode($cosmetic->data, true);
                }
            }
        }
        return response()->json($articles);
    }

    public function claim_free(Request $request) {
        $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
        $article_id = $request->input('article_id');
        if(!isset($article_id)) return response()->json(["status" => "error", "message" => "Vous devez spécifier un identifiant d'article"]);


        if(gettype($article_id) == "integer" && $article_id > -1) {
            $article = Articles::where('id', '=', $article_id)->where('price', '<=', 0)->where('enable', '=', 1)->first();
            if($article == null) return response()->json(["status" => "error", "message" =>  "L'article spécifier est introuvable"]);

            $dateToCheck = $article->limited_at;
            $checkDate = new \DateTime($dateToCheck);
            $currentDate = new \DateTime();
            if ($checkDate < $currentDate) {
                return response()->json(["status" => "error", "message" =>  "La date limite a été dépassée."]);
            }
        }else if(gettype($article_id) == "string" && str_starts_with($article_id, '-1')) {
            $article_id = str_replace('-1.', '', $article_id);
            $cosmeticGet = Cosmetic::where('id', intval($article_id))->where('free', 0)->where('claimable', 1)->first();
            if($cosmeticGet == null) return response()->json(["status" => "error", "message" =>  "Le cosmétique spécifier est introuvable"]);
        }

        $paymentCheck = Payments::where('payer_userid', $user->id)->where('cart', '=', json_encode([$article_id]))->where('payment_status', 'approved')->first();
        if($paymentCheck !== null) return response()->json(["status" => "error", "message" =>  "Vous avez déjà claim cet article."]);

        if(gettype($article_id) == "integer" && $article_id > -1) {
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
        }else{
            $itemExist = DB::table('users__cosmetics')->where('user_id', $user->id)->where('cosmetic_id', $cosmeticGet->id)->first();
            if($itemExist == null){
                $uc = new UserCosmetics;
                $uc->user_id = $user->id;
                $uc->cosmetic_id = $cosmeticGet->id;
                $uc->payment_id = -1;
                $uc->save();
            }
        }

        $payment = new Payments;
        $payment->payment_id = "";
        $payment->payer_userid = $user->id;
        $payment->payer_email = "";
        $payment->payer_type = "free";
        $payment->cart = json_encode([intval($article_id)]);
        $payment->amount = strval(0);
        $payment->currency = "EUR";
        $payment->payment_status = "approved";
        $payment->save();

        return response()->json(["status" => "success", "message" => "Vous avez bien récupérer les cosmétiques liés à cet article"]);
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
