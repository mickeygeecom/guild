<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Guild;

class GuildSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Guild::create(['name' => 'about', 'value' => 'About this guild...']);
        Guild::create(['name' => 'name', 'value' => 'Super Necessary']);
        Guild::create(['name' => 'faction', 'value' => 'horde']);
        Guild::create(['name' => 'realm', 'value' => 'Draenor']);
        Guild::create(['name' => 'region', 'value' => 'EU']);
    }
}
