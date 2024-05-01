<?php

use App\Http\Controllers\Admin\QuizzMasterController;
use App\Http\Controllers\AdminController;

use Illuminate\Support\Facades\Route;

Route::get('/', [AdminController::class, 'index'])->name('index');

Route::prefix('qm')->name('qm.')->middleware(['auth_twitch'])->group(function() {
    Route::get('/history', [QuizzMasterController::class, 'history'])->name('history');
});
