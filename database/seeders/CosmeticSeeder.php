<?php

namespace Database\Seeders;

use App\Models\Cosmetic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CosmeticSeeder extends Seeder
{
    function func() { 
        require_once('cosmetics.php'); 
        return $cosmetics; 
    } 
    /**
    * Run the database seeds.
    */
    public function run(): void
    {
        $cosmetics = $this->func();
        foreach ($cosmetics as $cosmetic) {
            $cosmeticItem = Cosmetic::where('id', $cosmetic['id'])
            ->first();
            
            if ($cosmeticItem === null) {
                $cosmeticItem = Cosmetic::create([
                    'id'   => $cosmetic['id'],
                    'type'   => $cosmetic['type'],
                    'sub_type'  => $cosmetic['sub_type'],
                    'name'   => $cosmetic['name'],
                    'style'   => $cosmetic['style'],
                    'data'   => $cosmetic['data'],
                    'free'   => $cosmetic['free'],
                    'rarity'   => $cosmetic['rarity'],
                    'claimable' => $cosmetic['claimable']
                ]);
            }
            else {
                $cosmeticItem->update([
                    'type'   => $cosmetic['type'],
                    'sub_type'  => $cosmetic['sub_type'],
                    'name'   => $cosmetic['name'],
                    'style'   => $cosmetic['style'],
                    'data'   => $cosmetic['data'],
                    'free'   => $cosmetic['free'],
                    'rarity'   => $cosmetic['rarity'],
                    'claimable' => $cosmetic['claimable']
                ]);
            }
        }
    }
}
