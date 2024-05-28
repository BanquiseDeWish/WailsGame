<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalsController extends Controller
{

    public function page(Request $request, $page) {
        $jsx = "";
        switch($page) {
            case "cgu":
                $jsx = "CGU";
                break;
            case "cgv":
                $jsx = "CGV";
                break;
            case "mentions-legals":
                $jsx = "MentionsLegals";
                break;
            default:
                abort(404);
                break;
        }

        return Inertia::render("Legals/" . $jsx, []);
    }

}
