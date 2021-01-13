<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usp;

class UspsController extends Controller
{
    public function all() {
        return response(Usp::all());
    }
}
