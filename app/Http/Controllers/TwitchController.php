<?php

namespace App\Http\Controllers;
use App\Models\Stream;
use romanzipp\Twitch\Twitch;

use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Requests\Auth\UserTwitch;

class TwitchController extends Controller
{
    private $twitch;

    public function __construct()
    {
        $this->twitch = new Twitch;
    }

    public function start()
    {

        return Inertia::location($this->twitch->getOAuthAuthorizeUrl('code', ['user_read']));
    }

    public function callback(Request $request)
    {
        if(!$request->has('code'))
            return redirect(route('/'));
        $token = $this->twitch->getOAuthToken($request->input('code'));
        $token = (array) $token->data();
        $userId = $this->requestUserId($token['access_token']);
        $token['user_id'] = $userId->user_id;

        $userInfo = $this->requestUserDatas($token['access_token'], $userId->user_id);
        $request->session()->put('twitch', $userInfo->data[0]);

        User::registerOrUpdateUser($userId->user_id, $userInfo->data[0]->display_name);

        if($request->session()->has('referer_url_before_twitch')) {
            $url = $request->session()->get('referer_url_before_twitch');
            $request->session()->forget('referer_url_before_twitch');
            return Inertia::location($url);
        }else{
            return redirect(route('/'));
        }
    }

    public function destroy(Request $request)
    {
        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect(route('/'));
    }

    function requestUserId($token) {
        $ch = curl_init('https://id.twitch.tv/oauth2/validate');
        $authorization = "Authorization: Bearer ".$token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    function streamData($token, $userId) {
        $ch = curl_init('https://api.twitch.tv/helix/streams?type=live&user_id='.$userId);
        $authorization = "Authorization: Bearer ".$token;
        $clientID = 'Client-Id: 2rlyh4f7k4f0gv3jyds1p3jxmk7fyy';
        curl_setopt($ch, CURLOPT_HTTPHEADER, array($authorization, $clientID));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    function requestUserDatas($token, $userId) {
        $ch = curl_init('https://api.twitch.tv/helix/users?id='.$userId);
        $authorization = "Authorization: Bearer ".$token;
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Client-Id: '.config('twitch-api.client_id', ""), $authorization ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        $result = curl_exec($ch);
        curl_close($ch);
        return json_decode($result);
    }

    function registerUser(Request $request) {
        $inputs = $request->all();
        $userId = $inputs['userId'];
        $userName = $inputs['userName'];
        $user = User::registerOrUpdateUser($userId, $userName);
        return response()->json(["state" => "success", "user" => $user]);
    }

    function getUser(Request $request) {
        $inputs = $request->all();
        $userId = $inputs['userId'];
        $user = User::getFromID($userId);
        return response()->json(["state" => "success", "user" => $user]);
    }

    function registerStream(Request $request) {
        $inputs = $request->all();
        $streamId = $inputs['streamId'];
        $streamName = $inputs['streamName'];
        $startedAt = $inputs['startedAt'];
        $endedAt = $inputs['endedAt'];
        $stream = Stream::registerOrUpdate($streamId, $streamName, $startedAt, $endedAt);
        return response()->json(["state" => "success", "stream" => $stream]);
    }
}
