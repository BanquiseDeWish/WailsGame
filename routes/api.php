<?php

use App\Http\Controllers\GameController;
use App\Http\Controllers\UserController;
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
    Route::get('/user/info', [GameController::class, 'getUserGameInfos'])->name('api.user.info');
    Route::post('/user/register', [TwitchController::class, 'register'])->name('api.user.register');

    Route::post('/predigivre/registerPoints', [GameController::class, 'registerPGPoints'])->name('api.predigivre.registerPoints');
    Route::post('/user/all/points/vipgames/register', [UserController::class, 'registerUsersVipGamesPoints'])->name('api.user.all.points.vipgames.register');
});


Route::get('/user/{twitch_id}/icon', [UserController::class, 'getUserIcon'])->name('api.user.icon');
Route::post('user/all/points/vipgames', [UserController::class, 'getUserListVIPGamesPoints'])->name('api.user.all.points.vipgames');

