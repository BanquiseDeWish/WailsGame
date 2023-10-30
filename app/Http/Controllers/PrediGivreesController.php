<?php

namespace App\Http\Controllers;

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
        $hallOfFame = $this->requestPaginate($request, $filter, 0);
        return Inertia::render('Games/PrediGivreeIndex', ['filter' => $filter, 'hallOfFame' => $hallOfFame]);
    }

    public function requestPaginate(Request $request, $filter, $page)
    {
        $prediGivreData = $this->sqlPaginate($filter, $page);
        return $prediGivreData;
    }

    public function sqlPaginate($filter, $page){
        $prediGivreData = DB::table('predigivrees__points')
            ->select(DB::raw('user_id, SUM(points) AS points'))
            ->groupBy('user_id')
            ->orderBy('points', 'desc');

        switch ($filter) {
            case 'today':
                $prediGivreData = $prediGivreData->whereDate('created_at', Carbon::now());
                break;
            case 'week':
                $prediGivreData = $prediGivreData
                    ->whereBetween('created_at', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()]);
                break;
            case 'month':
                $prediGivreData = $prediGivreData
                    ->whereMonth('created_at', Carbon::now()->month);
                break;
            case 'year':
                $prediGivreData = $prediGivreData
                    ->whereYear('created_at', Carbon::now()->year);
                break;
            case 'all':
                break;
        }

        $prediGivreData = $prediGivreData->paginate(10, ['*'], 'predigivrees', $page);

        foreach ($prediGivreData as  $k => $pgd) {
            $user = User::where('twitch_id', '=', $pgd->user_id)->first();
            if ($user == null) $pgd->userName = "N/A";
            else $pgd->userName = $user->twitch_username;
        }

        return $prediGivreData;
    }
}
