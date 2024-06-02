<?php

namespace Database\Seeders;

use App\Models\CosmeticsTabs;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ShopCategoriesSeeder extends Seeder
{
    function func() { 
        require_once('cosmetics_tab.php'); 
        return $cosmetics__tabs; 
    } 
    /**
    * Run the database seeds.
    */
    public function run(): void
    {
        $cosmetics__tabs = $this->func();
        foreach ($cosmetics__tabs as $tab) {
            $tabItem = CosmeticsTabs::where('id', $tab['id'])
            ->first();
            
            if ($tabItem === null) {
                $tabItem = CosmeticsTabs::create([
                    'id'   => $tab['id'],
                    'key'   => $tab['key'],
                    'name'  => $tab['name'],
                    'parent'   => $tab['parent'],
                    'active'   => $tab['active']
                ]);
            }
            else {
                $tabItem->update([
                    'id'   => $tab['id'],
                    'key'   => $tab['key'],
                    'name'  => $tab['name'],
                    'parent'   => $tab['parent'],
                    'active'   => $tab['active']
                ]);
            }
        }
    }
}
