<?php

namespace Database\Seeders;

use App\Models\Articles;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShopArticlesSeeder extends Seeder
{
    function func() { 
        require_once('articles.php'); 
        return $articles; 
    } 
    /**
    * Run the database seeds.
    */
    public function run(): void
    {
        $articles = $this->func();
        foreach ($articles as $item) {
            $article = Articles::where('id', $item['id'])
            ->first();
            
            if ($article === null) {
                $article = Articles::create([
                    'id'   => $item['id'],
                    'name'   => $item['name'],
                    'price' => $item['price'],
                    'cosmetics'  => $item['cosmetics'],
                    'description'   => $item['description'],
                    'promo'   => $item['promo'],
                    'tab'   => $item['tab'],
                    'enable'   => $item['enable'],
                    'thumbnail' => $item['thumbnail'],
                    'limited_at' => $item['limited_at']
                ]);
            }
            else {
                $article->update([
                    'id'   => $item['id'],
                    'name'   => $item['name'],
                    'price' => $item['price'],
                    'cosmetics'  => $item['cosmetics'],
                    'description'   => $item['description'],
                    'promo'   => $item['promo'],
                    'tab'   => $item['tab'],
                    'enable'   => $item['enable'],
                    'thumbnail' => $item['thumbnail'],
                    'limited_at' => $item['limited_at']
                ]);
            }
        }
    }
}
