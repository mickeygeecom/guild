<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Guild;
use Exception;

class GuildController extends Controller
{
    public function get() {
        return response(Guild::all());
    }

    private function saveGuildField(string $field = '', string $value = '') {
        Guild::where('name', $field)->update(['value' => $value]);
    }

    public function save(Request $request) {
        try {
            $guild = json_decode($request->guild);
            $this->saveGuildField('faction', $guild->faction);
            $this->saveGuildField('region', $guild->region);
            $this->saveGuildField('realm', $guild->realm);
            $this->saveGuildField('name', $guild->name);
            return response(true);
        } catch (Exception $e) {
            return abort(400, $e);
        }
    }
}
