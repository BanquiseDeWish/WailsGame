<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Articles extends Model
{
    use HasFactory;

    protected $table = "articles";

    public function scopeExcludeArticles($query, $articles)
    {
        return $query->whereNotIn('id', $articles);
    }
}
