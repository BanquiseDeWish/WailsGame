<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class OverlayController extends Controller
{

    public function pg(Request $request) {
        return Inertia::render('Overlay/PrediGivrees', []);
    }

    public function tpg(Request $request) {
        return Inertia::render('Overlay/PrediGivrees', ["test" => true]);
    }

}
