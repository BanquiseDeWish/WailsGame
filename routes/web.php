<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\PrediGivreesController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VIPGameController;
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

Route::prefix('vipgames')->name('vipgames.')->group(function() {
    Route::get('/', [VIPGameController::class, 'index'])->name('index');
});

Route::prefix('predigivre')->name('predigivre.')->group(function() {
    Route::get('/halloffame', [PrediGivreesController::class, 'hallOfFamePredigivre'])->name('halloffame');
    Route::get('/halloffame/{filter}', [PrediGivreesController::class, 'hallOfFamePredigivre'])->name('halloffame');
    Route::get('/filter/{filter}', [PrediGivreesController::class, 'requestFilter'])->name('filter');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth_twitch', 'is_weils'])->name('dashboard');

Route::get('/vip_games', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth_twitch', 'is_weils'])->name('vip_games');

Route::prefix('profile')->name('profile.')->group(function() {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    Route::get('/appearance', [ProfileController::class, 'appearance'])->name('appearance');
});


Route::get('boutique/merch', function() {
    return redirect('https://store.streamelements.com/weilsttv');
})->name('boutique.merch');

Route::get('/user/{twitch_id}/icon', [UserController::class, 'getUserIcon'])->name('user.icon');

require __DIR__.'/auth.php';
