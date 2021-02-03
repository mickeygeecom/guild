<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guild;
use Exception;

class GuildController extends Controller
{
    public function all() {
        return response(Guild::all());
    }

    private function saveGuildField(string $field = '', string $value = '') {
        Guild::where('name', $field)->update(['value' => $value]);
    }

    public function save(Request $request) {
        try {
            foreach (json_decode($request->guild) as $value => $field) {
                $this->saveGuildField($value, $field);
            }
            return response(true);
        } catch (Exception $e) {
            return abort(400, $e);
        }
    }
}
