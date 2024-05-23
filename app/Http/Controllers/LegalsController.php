<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class LegalsController extends Controller
{

    public function page(Request $request, $page) {
        $jsx = "";
        switch($page) {
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
