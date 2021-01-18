<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spec;

class SpecsController extends Controller
{
    public function all() {
        return response(Spec::all()->groupBy('class'));
    }
}
