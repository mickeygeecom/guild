<?php

use App\Http\Controllers\GuildController;
use App\Http\Controllers\UspsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/guild', [GuildController::class, 'save']);
Route::get('/guild', [GuildController::class, 'get']);
Route::get('/usps', [UspsController::class, 'all']);
