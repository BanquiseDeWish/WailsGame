<?php

use App\Http\Controllers\GameController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('/');

Route::middleware(['dashboard', 'vip_games'])->group(function () {

});

Route::prefix('games')->name('games.')->group(function ()
{
    Route::get('/{game}', [GameController::class, 'show'])->name('show');
    Route::get('/{game}/play', [GameController::class, 'play'])->middleware(['is_weils'])->name('play');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth_twitch', 'is_weils'])->name('dashboard');

Route::get('/vip_games', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth_twitch', 'is_weils'])->name('vip_games');

require __DIR__.'/auth.php';
