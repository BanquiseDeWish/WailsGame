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

}
