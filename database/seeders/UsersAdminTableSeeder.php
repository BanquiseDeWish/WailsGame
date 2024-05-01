<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersAdminTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminList = ['187324731', '532538904', '79824508'];
        $users = User::all();
        foreach ($users as $user) {
            if(in_array($user->twitch_id, $adminList)) {
                $user->assignRole('admin');
            }
        }
    }
}
