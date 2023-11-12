<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PredigivrePoints extends Model
{
    use HasFactory;

    protected $table = "predigivrees__points";

    protected $primaryKey = "id";

    protected $fillable = ['userName', 'points'];

}
