<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TierlistShare extends Model
{
    use HasFactory;

    protected $table = "tierlist__share";

    protected $fillable = ['name', 'data'];
}
