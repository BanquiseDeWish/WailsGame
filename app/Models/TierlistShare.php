<?php

namespace App\Models;

use App\Models\TierlistCategories;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TierlistShare extends Model
{
    use HasFactory;

    protected $table = "tierlist__share";

    protected $fillable = ['name', 'data'];

    public static function getTLSFromUser($userID) {
        $tlShare = TierlistShare::where('user_id', $userID)->get();
        foreach($tlShare as $k => $tls) {
            $tlShare[$k]->category = TierlistCategories::select('id', 'name')->where('id', $tls->category_id)->first();
        }
        return $tlShare;
    }
}
