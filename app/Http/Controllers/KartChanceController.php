<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KartChanceController extends Controller
{

    public function index(Request $request) {
        return Inertia::render('Games/KartChanceIndex', []);
    }

    public function sprite($type, $name) {
        $img = Storage::disk('public')->get('/kc/sprites/'.$type.'/'.$name.'.webp');
        return response($img)->header('Content-type','image/png');
    }

}
