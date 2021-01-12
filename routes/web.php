<?php

use Illuminate\Support\Facades\Route;
use App\Models\Guild;

Route::get('/{path}', function() {
    return view('app', ['guild' => Guild::all()]);
})->where('path', '.*')->name('index');
