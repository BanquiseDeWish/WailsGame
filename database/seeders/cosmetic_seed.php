<?php

namespace Database\Seeders;

use App\Models\Cosmetic;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class cosmetic_seed extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $Cosmetics = [
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Bleu Turquoise',
                'style' => '#49DCE5',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Bleu Royale',
                'style' => 'linear-gradient(180deg, #194FDA 0%, #0D1670 100%)',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Rouge Royal',
                'style' => 'linear-gradient(180deg, #D9170B 0%, #4B0A0A 100%)',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Jaune Citron',
                'style' => 'linear-gradient(180deg, #FFC700 0%, #714007 100%)',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Bleu matinal',
                'style' => 'linear-gradient(180deg, #0045F8 0%, #6976F1 100%, #969FEE 100%)',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Rose Pétant',
                'style' => 'linear-gradient(180deg, #FE71F8 0%, #7A0B76 100%)',
            ],
            [
                'type' => 'card',
                'sub_type' => 'colorIcon',
                'name' => 'Rouge radial',
                'style' => 'radial-gradient(50% 50% at 50% 50%, #520A0A 0%, #C11919 74.48%, #230404 100%)',
            ]
        ];

        /*
         * Add Cosmetic Items
         *
         */
        foreach ($Cosmetics as $Cosmetic) {
            $newCosmeticItem = Cosmetic::where('type', $Cosmetic['type'])->where('sub_type',  $Cosmetic['sub_type'])->where('name',  $Cosmetic['name'])->first();

            $style = null;
            $position = null;
            if(isset($Cosmetic['style'])) $style = $Cosmetic['style'];
            if(isset($Cosmetic['position'])) $position = $Cosmetic['style'];

            if ($newCosmeticItem === null) {
                $newCosmeticItem = Cosmetic::create([
                    'type'   => $Cosmetic['type'],
                    'sub_type'  => $Cosmetic['sub_type'],
                    'name'   => $Cosmetic['name'],
                    'style'   => $style,
                    'position'   => $position,
                ]);
            }
        }
    }
}
