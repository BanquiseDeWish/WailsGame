<?php

namespace App\Http\Controllers;

use App\Models\PenguinCard;
use Illuminate\Support\Facades\DB;
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
        $hallOfFame = $this->requestFilter($request, $filter);
        return Inertia::render('Games/PrediGivreeIndex', ['filter' => $filter, 'hallOfFame' => $hallOfFame]);
    }

    public function requestFilter(Request $request, $filter)
    {
        $prediGivreData = $this->sqlPaginate($filter);
        return $prediGivreData;
    }

    public function sqlPaginate($filter){
        //Ranking
        $prediGivreData = DB::table('predigivrees__points')
            ->select(DB::raw('user_id, SUM(points) AS points'))
            ->groupBy('user_id')
            ->orderBy('points', 'desc');

        //Stats
        //Most Win
        $statsMostWin = DB::table('predigivrees__history')
            ->select(DB::raw('win_position, COUNT(win_position) AS winning'))
            ->groupBy('win_position')
            ->orderBy('winning', 'desc');

        //Most Choice
        $statsMostChoice = DB::table('predigivrees__history');

        switch ($filter) {
            case 'today':
                $prediGivreData = $prediGivreData->whereDate('created_at', Carbon::now());
                $statsMostWin = $statsMostWin->whereDate('created_at', Carbon::now());
                $statsMostChoice = $statsMostChoice->whereDate('created_at', Carbon::now());
                break;
            case 'week':
                $prediGivreData = $prediGivreData
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                $statsMostWin = $statsMostWin
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                $statsMostChoice = $statsMostChoice
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $prediGivreData = $prediGivreData
                    ->whereMonth('created_at', Carbon::now()->month);
                $statsMostWin = $statsMostWin
                    ->whereMonth('created_at', Carbon::now()->month);
                $statsMostChoice = $statsMostChoice
                    ->whereMonth('created_at', Carbon::now()->month);
                break;
            case 'year':
                $prediGivreData = $prediGivreData
                    ->whereYear('created_at', Carbon::now()->year);
                $statsMostWin = $statsMostWin
                    ->whereYear('created_at', Carbon::now()->year);
                $statsMostChoice = $statsMostChoice
                    ->whereYear('created_at', Carbon::now()->year);
                break;
            case 'all':
                break;
        }

        $prediGivreData = $prediGivreData->limit(100)->get();
        $statsMostWin = $statsMostWin->first();
        $statsMostChoice = $statsMostChoice->get();

        $mostChoiceList = array();
        foreach($statsMostChoice as $mostChoice) {
            $explode = explode(",", $mostChoice->most_choice_position);
            foreach($explode as $str) {
                array_push($mostChoiceList, intval($str));
            }
        }

        $occurrences = array_count_values($mostChoiceList);
        arsort($occurrences);

        $topMostChoice = array_slice($occurrences, 0, 3, true);

        foreach ($prediGivreData as  $k => $pgd) {
            $user = User::where('twitch_id', '=', $pgd->user_id)->first();
            $pcUser = PenguinCard::getCardFromTWID($pgd->user_id);
            if ($user == null) $pgd->userName = "N/A";
            else $pgd->userName = $user->twitch_username;

            if ($pcUser !== null) $pgd->pcUser = $pcUser;
            else $pgd->pcUser = null;
        }
        return ['hof' => $prediGivreData, 'stats' => array('mostWin' => $statsMostWin, 'mostChoice' => $topMostChoice)];
    }
}
