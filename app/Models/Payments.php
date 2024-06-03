<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payments extends Model
{
    use HasFactory;

    protected $table = "payments";

    protected $fillable = [
        'payer_id',
        'payer_email',
        'payment_status',
    ];

    public static function getArticlesUserPayed($user_id) {
        $articles_already_payed = [];
        $paymentUser = Payments::where('payer_userid', $user_id)->get();
        foreach($paymentUser as $payment) {
            $cart = json_decode($payment->cart, true);
            foreach($cart as $item) {
                if(!in_array($item, $articles_already_payed)) {
                    array_push($articles_already_payed, $item);
                }
            }
        }
        return $articles_already_payed;
    }

    public static function getArticlesUserPayedWithDetails($user_id) {
        $articles_already_payed = [];
        $cosmetic_tabs_data = [];
        $paymentUser = Payments::where('payer_userid', $user_id)->where('payment_status', 'approved')->orderBy('created_at', 'DESC')->get();
        foreach($paymentUser as $payment) {
            $cart = json_decode($payment->cart, true);
            $articles = [];
            foreach($cart as $item) {
                $article = Articles::where('id', $item)->first();
                $article->cosmetics = json_decode($article->cosmetics, true);
                $article_tab_id = $article->tab;
                if (!array_key_exists($article_tab_id, $cosmetic_tabs_data)) {
                    $article->tab = CosmeticsTabs::where('id', $article_tab_id)->first();
                    $cosmetic_tabs_data[$article_tab_id] = $article->tab;
                }else{
                    $article->tab = $cosmetic_tabs_data[$article_tab_id];
                }
                array_push($articles, $article);
            }
            $payment->articles = $articles;
            array_push($articles_already_payed, $payment);
        }
        return $articles_already_payed;
    }

}
