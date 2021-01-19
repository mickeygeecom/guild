<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spec;

class SpecsController extends Controller
{
    public function all() {
        return response(Spec::all()->groupBy('class'));
    }

    public function save(Request $request) {
        $classes = json_decode($request->specs);
        foreach ($classes as $class) {
            foreach ($class as $spec) {
                Spec::where('class', $spec->class)->where('spec', $spec->spec)->update(['recruiting' => $spec->recruiting]);
            }
        }
        return response(true);
    }
}
