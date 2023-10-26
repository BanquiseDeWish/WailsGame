<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Storage;



class UserController extends Controller
{
    
    public function getUserIcon(Request $request, $twitch_id)
    {
        if (Storage::disk('public')->exists('/penguins/'.$twitch_id .'.png'))
            $img =  Storage::disk('public')->get('/penguins/'.$twitch_id.'.png');
        else
            $img = Storage::disk('public')->get('/penguins/default.png');
        return response($img)->header('Content-type','image/png');
    }

}
