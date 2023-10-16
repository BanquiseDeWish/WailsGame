<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TwitchController;

Route::middleware('guest')->group(function () {
    Route::prefix('twitch')->name('twitch.')->group(function () {
        Route::get('/start', [TwitchController::class, 'start'])->name('start');
        Route::get('/callback', [TwitchController::class, 'callback'])->name('callback');
        Route::get('/logout', [AuthenticatedSessionController::class, 'destroy']);
    });
});