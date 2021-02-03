<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Question;

class QuestionsController extends Controller
{
    public function all() {
        return response(Question::all());
    }

    public function save(Request $request) {
        if (!$questions = json_decode($request->questions)) {
            return abort(405);
        }

        Question::truncate();

        foreach ($questions as $question) {
            $question->options = json_encode($question->options);
            Question::create((array) $question);
        }

        return response(true);
    }
}
