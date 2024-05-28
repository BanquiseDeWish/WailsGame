<?php

use App\Http\Controllers\User\AppareanceController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\KartChanceController;
use App\Http\Controllers\PrediGivreesController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\VIPGameController;
use App\Http\Controllers\OverlayController;
use App\Http\Controllers\QuizzMasterController;
use App\Http\Controllers\TierlistController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LegalsController;
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

Route::prefix('vipgames')->name('vipgames.')->group(function() {
    Route::get('/', [VIPGameController::class, 'index'])->name('index');
    Route::get('/play', [VIPGameController::class, 'play'])->middleware(['is_weils'])->name('play');
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

Route::prefix('profile')->name('profile.')->middleware(['auth_twitch'])->group(function() {
    Route::get('/', [ProfileController::class, 'index'])->name('index');
    //Route::get('/appearance', [AppareanceController::class, 'index'])->name('appearance');
});


Route::get('boutique/merch', function() {
    return Inertia::location('https://store.streamelements.com/weilsttv');
})->name('boutique.merch');

Route::get('/user/{twitch_id}/icon', [UserController::class, 'getUserIcon'])->name('user.icon');

Route::prefix('kartchance')->name('kartchance.')->group(function() {
    Route::get('/', [KartChanceController::class, 'index'])->name('index');
    Route::get('/sprite/{type}/{name}', [KartChanceController::class, 'sprite'])->name('sprite');
});

Route::prefix('overlay')->name('overlay.')->group(function() {
    Route::get('/pg', [OverlayController::class, 'pg'])->name('pg');
    Route::get('/tpg', [OverlayController::class, 'tpg'])->name('tpg');
});

Route::prefix('tools')->name('tools.')->middleware(['auth_twitch'])->group(function() {
    Route::get('/{game}/{gameId?}', [GameController::class, 'toolsIndex'])->name('index');
});

Route::prefix('tierlist')->name('tierlist.')->middleware(['auth_twitch'])->group(function() {
    Route::get('/', [TierlistController::class, 'index'])->name('index');
    Route::get('/play/{id}/{tls_id}', [TierlistController::class, 'play'])->name('play');
    Route::get('/view/{userid}/{id}', [TierlistController::class, 'view'])->name('view');
    Route::post('/share', [TierlistController::class, 'share'])->name('share');
    Route::post('/delete', [TierlistController::class, 'delete'])->name('delete');
});

Route::prefix('games')->name('games.')->middleware(['auth_twitch'])->group(function() {
    Route::prefix('quizz')->name('quizz.')->group(function() {
        if(env('QUIZZMASTER_STATE') == "true") {
            Route::get('/', [QuizzMasterController::class, 'index'])->name('index');
            Route::get('/party/{gameId}', [QuizzMasterController::class, 'party'])->name('party');
        }
        Route::get('/form', [QuizzMasterController::class, 'form'])->name('form');
        Route::post('/form/send_question', [QuizzMasterController::class, 'send_question'])->name('form.submit');
        Route::post('/report_submit', [QuizzMasterController::class, 'report_submit'])->name('report_submit');
    });
});


Route::get('/dev/calc_stats', [VIPGameController::class, 'calcStatsView'])->middleware(['is_weils'])->name('dev.calc_stats');

Route::middleware('auth_twitch')->group(function() {
    Route::post('/user/update/cosmetics/', [AppareanceController::class, 'save'])->name('user.cosmetics.update');
});

Route::prefix('legals')->name('legals.')->middleware(['auth_twitch'])->group(function() {
    Route::get('/{page}', [LegalsController::class, 'page'])->name('page');
});

require __DIR__.'/auth.php';
