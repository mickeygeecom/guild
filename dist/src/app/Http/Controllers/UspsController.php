<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usp;

class UspsController extends Controller
{
    public function all() {
        return response(Usp::all());
    }

    public function save(Request $request) {
        if (!$usps = json_decode($request->usps)) {
            return abort(405);
        }

        Usp::truncate();

        foreach ($usps as $usp) {
            Usp::create((array) $usp);
        }

        return response(true);
    }
}
