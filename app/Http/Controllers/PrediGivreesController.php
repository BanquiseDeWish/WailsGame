<?php

namespace App\Http\Controllers;

use DB;
use App\Models\User;
use App\Models\PredigivrePoints;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class PrediGivreesController extends Controller
{



    //HallOfFame for PrediGivrees
    public function hallOfFamePredigivre(Request $request, $filter = "today")
    {
        $hallOfFame = $this->requestPaginate($request, $filter, 0);
        return Inertia::render('Games/PrediGivreeIndex', ['filter' => $filter, 'hallOfFame' => $hallOfFame]);
    }

    public function requestPaginate(Request $request, $filter, $page = 0)
    {
        $dataMax = 10;
        $name = "predigivre_points";

        switch ($filter) {
            case 'today':
                $prediGivreData = PredigivrePoints::whereDate('updated_at', Carbon::now())->get();
                break;
            case 'week':
                $prediGivreData = PredigivrePoints::whereDate('created_at', '>=', Carbon::now()->startOfWeek())->whereDate('created_at', '<=', Carbon::now()->endOfWeek())
                    ->get();
                break;
            case 'month':
                $prediGivreData = PredigivrePoints::whereMonth('updated_at', Carbon::now()->month)->whereYear('updated_at', Carbon::now()->year)->get();
                break;
            case 'year':
                $prediGivreData = PredigivrePoints::whereYear('updated_at', Carbon::now()->year)->get();
                break;
            case 'all':
                $prediGivreData = PredigivrePoints::get();
                break;
        }

        foreach ($prediGivreData as  $k => $pgd) {
            $user = User::where('twitch_id', '=', $pgd->user_id)->first();
            if ($user == null) $pgd->userName = "N/A";
            else $pgd->userName = $user->twitch_username;
        }

        $players = [];

        foreach ($prediGivreData as $pgd) {
            $userId = $pgd->user_id;

            if (!isset($players[$userId])) {
                $players[$userId] = ['points' => 0, 'entries' => []];
            }
            // Ajoutez l'entrée à la clé d'âge appropriée
            $players[$userId]['entries'][] = [$pgd->toArray()];
        }

        foreach ($players as $k => $ps) {
            foreach ($ps['entries'] as $pts) {
                $players[$k]['points'] += $pts[0]['points'];
            }
            $players[$k]['user'] = $pts[0];
            unset($players[$k]['entries']);
        }

        usort($players, function ($a, $b) {
            return $b['points'] - $a['points'];
        });


        $ip = 0;
        foreach ($players as $k => $ps) {
            $players[$k]['position'] = $ip + 1;
            $ip++;
        }

        return $players;
    }
}
