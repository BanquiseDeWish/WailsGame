<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TwitchController;

Route::prefix('twitch')->name('twitch.')->middleware('guest')->group(function () {
    Route::get('/start', [TwitchController::class, 'start'])->name('start');
    Route::get('/callback', [TwitchController::class, 'callback'])->name('callback');
});
Route::prefix('twitch')->name('twitch.')->middleware('auth_twitch')->group(function () {
    Route::get('/logout', [TwitchController::class, 'destroy'])->name('logout');
});
