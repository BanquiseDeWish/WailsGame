<?php

namespace App\Http\Controllers;

use App\Models\Articles;
use App\Models\Cosmetic;
use Exception;
use Illuminate\Http\Request;
use Omnipay\Omnipay;
use Omnipay\Common\ItemBag;
use App\Models\Payments;
use App\Models\User\UserCosmetics;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class PayPalController extends Controller
{

    private $gateway = null;

    public function __construct()
    {
        $testMode = (env('PAYPAL_MODE', 'production') == "sandbox");
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId((($testMode) ? env('PAYPAL_SANDBOX_CLIENT_ID') : env('PAYPAL_CLIENT_ID')));
        $this->gateway->setSecret((($testMode) ? env('PAYPAL_SANDBOX_CLIENT_SECRET') : env('PAYPAL_CLIENT_SECRET')));
        $this->gateway->setTestMode($testMode); //set it to 'false' when go live
    }

    public function start(Request $request) {
        try {
            $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
            $cart = $request->input('articles');
            if(count($cart) == 0) return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Votre panier est vide."));
            foreach($cart as $articleId) {
                $article = Articles::where('id', $articleId)->where('enable', 1)->first();
                if($article == null) continue;

                //Check limited_at
                $dateToCheck = $article->limited_at;
                $checkDate = new \DateTime($dateToCheck);
                $currentDate = new \DateTime();
                if ($checkDate < $currentDate) {
                    continue;
                }

                $cosmeticsCheck = json_decode($article->cosmetics, true);

                $paymentCheck = Payments::where('payer_userid', $user->id)->where('payment_status', 'approved')->get();
                foreach($paymentCheck as $payment) {
                    $cart_decode = json_decode($payment->cart, true);
                    foreach($cart_decode as $item) {
                        if(in_array($item, $cart_decode)) {
                            return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Vous avez déjà acheté cet article."));
                        }
                    }
                }

                foreach($cosmeticsCheck as $cosmetic) {
                    $itemExist = DB::table('users__cosmetics')->where('user_id', $user->id)->where('cosmetic_id', $cosmetic)->first();

                    if($itemExist !== null){
                        return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Vous possédez déjà cet article."));
                    }
                }
            }


            $price = 0.00;
            $items = new ItemBag();

            foreach($cart as $article){
                $item = Articles::where('id', $article)->where('enable', 1)->first();
                if($item !== null) {
                    $priceItem = $item->price;
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
                return Inertia::location($dataRes['links'][1]);
            } else {
                return redirect()->route('shop.index')->with("status", $this->toastResponse('error', $response->getMessage()));
            }
        } catch(Exception $e) {
            return redirect()->route('shop.index')->with("status", $this->toastResponse('error', "Une erreur interne est survenue :'(" . $e->getMessage()));
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
                $user = User::select('twitch_id', 'id')->where('twitch_id', '=', $request->session()->get('twitch')->id)->first();
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
                                $uc = new UserCosmetics;
                                $uc->user_id = $user->id;
                                $uc->cosmetic_id = $item->id;
                                $uc->payment_id = $transaction->id;
                                $uc->save();
                            }
                        }
                    }
                }

                return redirect()->route('shop.index.state', ['state' => 'success', 'payment_id' => $arr_body['id']])->with('shop_redirect_success', true)->with('status', $this->toastResponse('success', 'Achat terminé!'));
            } else {
                return redirect()->route('shop.index.state', ['state' => 'error', 'payment_id' => '-1'])->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
            }
        } else {
            return redirect()->route('shop.index.state', ['state' => 'error', 'payment_id' => '-1'])->with("status", $this->toastResponse('error', 'Une erreur inconnue est survenue'));
        }
    }

    public function error(Request $request)
    {
        return redirect()->route('shop.index.state', ['state' => 'error', 'payment_id' => '-1'])->with("status", $this->toastResponse('error', 'Transaction annulée'));
    }

}
