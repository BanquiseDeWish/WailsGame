<?php

use App\Http\Controllers\PayPalController;
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

Route::prefix('paypal')->name('paypal.')->middleware(['web', 'auth_twitch'])->group(function() {
    Route::post('/start', [PayPalController::class, 'start'])->name('start');
    Route::get('/success', [PayPalController::class, 'success'])->name('success');
    Route::get('/error', [PayPalController::class, 'error'])->name('error');
});
