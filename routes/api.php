<?php

use App\Http\Controllers\GameController;
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
});
