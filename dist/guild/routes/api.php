<?php

use App\Http\Controllers\GuildController;
use App\Http\Controllers\SpecsController;
use App\Http\Controllers\UspsController;
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;

Route::post('/specs', [SpecsController::class, 'save']);
Route::post('/guild', [GuildController::class, 'save']);
Route::get('/specs', [SpecsController::class, 'all']);
Route::get('/guild', [GuildController::class, 'get']);
Route::get('/usps', [UspsController::class, 'all']);
