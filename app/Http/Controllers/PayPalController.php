<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Cosmetic;
use Exception;
use Illuminate\Http\Request;
use Omnipay\Omnipay;
use Omnipay\Common\ItemBag;
use App\Models\Payments;
use App\Models\UsersCosmetics;

class PayPalController extends Controller
{

    private $gateway;
    private $testMode = false;

    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId((($this->testMode) ? env('PAYPAL_SANDBOX_CLIENT_ID') : env('PAYPAL_CLIENT_ID')));
        $this->gateway->setSecret((($this->testMode) ? env('PAYPAL_SANDBOX_CLIENT_SECRET') : env('PAYPAL_CLIENT_SECRET')));
        $this->gateway->setTestMode($this->testMode); //set it to 'false' when go live
    }

    public function start(Request $request) {
        try {
            $cart = [1];
            $price = 0;
            $items = new ItemBag();

            foreach($cart as $article){
                $item = Articles::where('id', $article)->first();
                if($item !== null) {
                    $discountValue = ($item->price / 100) * $item->promo;
                    $priceItem = $item->price - $discountValue;
                    $items->add([
                        'name' => $item->name,
                        'description' => $item->description,
                        'quantity' => '1',
                        'price' => $priceItem,
                    ]);
                    $price += $priceItem;
                }
            }

            $response = $this->gateway->purchase([
                'amount' => $price,
                'currency' => "EUR",
                'returnUrl' => route('paypal.success'),
                'cancelUrl' => route('paypal.error'),
            ])->setItems($items)->send();
            $user = $request->session()->get('twitch');
            $dataRes = $response->getData();

            $payment = new Payments;
            $payment->payment_id = $dataRes['id'];
            $payment->payer_userid = $user->id;
            $payment->payer_email = $user->email;
            $payment->payer_type = "paypal";
            $payment->cart = json_encode($cart);
            $payment->amount = strval($price);
            $payment->currency = "EUR";
            $payment->payment_status = "pending";
            $payment->save();

            if ($response->isRedirect()) {
                return $response->redirect();
            } else {
                return redirect()->route('/')->with("status", $this->toastResponse('error', $response->getMessage()));
            }
        } catch(Exception $e) {
            dd($e);
            return redirect()->route('/')->with("status", $this->toastResponse('error', "Une erreur interne est survenue :'("));
        }
    }

    public function success(Request $request)
    {
        // Once the transaction has been approved, we need to complete it.
        if ($request->input('paymentId') && $request->input('PayerID'))
        {
            $transaction = $this->gateway->completePurchase(array(
                'payer_id'             => $request->input('PayerID'),
                'transactionReference' => $request->input('paymentId'),
            ));
            $response = $transaction->send();

            if ($response->isSuccessful())
            {
                // The customer has successfully paid.
                $arr_body = $response->getData();
                $user = $request->session()->get('twitch');
                // Insert transaction data into the database
                $payment = new Payments;
                $transaction = $payment->where('payment_id', $arr_body['id'])->first();
                if($transaction == null)
                    return redirect()->route('/');
                if($transaction->payment_status == "approved")
                    return redirect()->route('/');

                $transaction->update([
                    "payer_id" => $arr_body['payer']['payer_info']['payer_id'],
                    "payer_email" => $arr_body['payer']['payer_info']['email'],
                    "payment_status" => $arr_body['state'],
                ]);

                $articles = json_decode($transaction->cart, true);
                foreach($articles as $article) {
                    $ar_item = Articles::where('id', $article)->first();
                    if($ar_item !== null) {
                        $cosmetics = json_decode($ar_item->cosmetics, true);
                        foreach($cosmetics as $cosm) {
                            $item = Cosmetic::where('id', $cosm)->first();
                            if($item !== null) {
                                $uc = new UsersCosmetics;
                                $uc->user_id = $user->id;
                                $uc->cosmetic_id = $item->id;
                                $uc->payment_id = $transaction->id;
                                $uc->save();
                            }
                        }
                    }
                }

                return redirect()->route('/')->with('status', $this->toastResponse('success', 'Achat terminé!'));
            } else {
                return redirect()->route('/')->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
            }
        } else {
            return redirect()->route('/')->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
        }
    }

    public function error(Request $request)
    {
        return redirect()->route('/')->with("status", $this->toastResponse('error', 'Transaction annulée'));
    }

}
