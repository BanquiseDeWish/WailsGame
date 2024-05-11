<?php

use App\Http\Controllers\CosmeticController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\QuizzMasterController;
use App\Http\Controllers\User\UserController;
use App\Http\Controllers\VIPGameController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TwitchController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api_check')->group(function() {
    Route::get('/user/info', [GameController::class, 'getUserGameInfos'])->name('user.info');
    Route::post('/user/register', [TwitchController::class, 'registerUser'])->name('user.register');
    Route::post('/stream/register', [TwitchController::class, 'registerStream'])->name('stream.register');

    Route::post('/predigivre/registerPoints', [GameController::class, 'registerPGPoints'])->name('predigivre.registerPoints');
    Route::post('/user/all/points/vipgames/register', [UserController::class, 'registerUsersVipGamesPoints'])->name('user.all.points.vipgames.register');

    Route::post('/game/vipgame/register', [VIPGameController::class, 'registerGame'])->name('game.vipgame.register');

    Route::post('/quizzmaster/register', [QuizzMasterController::class, 'registerHistory'])->name('game.quizzmaster.register');
});

Route::get('/user/{twitch_id}/icon', [UserController::class, 'getUserIcon'])->name('user.icon');
Route::get('/user/{twitch_id}/cosmetics/all', [CosmeticController::class, 'getUserCosmetics'])->name('user.cosmetics.all');
Route::get('/user/{twitch_id}/cosmetics/active', [CosmeticController::class, 'getUserActiveCosmetics'])->name('user.user.cosmetics.active');
Route::get('/user/{twitch_id}/points/vipgames', [UserController::class, 'getUserVIPGamesPoints'])->name('user.points.vipgames');
Route::get('/user/all/points/vipgames', [UserController::class, 'getUserListVIPGamesPoints'])->name('user.all.points.vipgames');

Route::get('/cosmetics/get', [CosmeticController::class, 'getCosmetics'])->name('cosmetics.get');

