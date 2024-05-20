<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Cosmetic;
use App\Models\CosmeticsTabs;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShopController extends Controller
{

    public function index(Request $request) {
        $tabs = [];
        $tabsParent = CosmeticsTabs::where('parent', '=', null)->get();
        foreach($tabsParent as $tab) {
            $tab->subtabs = CosmeticsTabs::where('parent', '=', $tab->id)->get();
            array_push($tabs, $tab);
        }
        return Inertia::render('Shop/Index', ['tabs'=>$tabs]);
    }

    public function articles(Request $request, $tab_id) {
        $articles = Articles::where('tab', '=', $tab_id)->get();
        foreach($articles as $article) {
            $cosmetics = json_decode($article->cosmetics, true);
            $article->cosmetics = Cosmetic::whereIn('id', $cosmetics)->get();
            foreach($article->cosmetics as $cosmetic) {
                $cosmetic->data = json_decode($cosmetic->data, true);
            }
        }
        return response()->json($articles);
    }


    public function cart(Request $request) {
        $list = $request->input('cart');
        $articles = Articles::select('id', 'name', 'price', 'promo', 'tab')->whereIn('id', $list)->get();
        foreach($articles as $article) {
            $article->tab = CosmeticsTabs::where('id', $article->tab)->first();
        }
        return response()->json($articles);
    }

}
