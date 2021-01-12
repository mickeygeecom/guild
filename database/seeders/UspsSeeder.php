<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Usp;

class UspsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Usp::create(['title' => 'Raid times', 'value' => "Wednesday 20:00 - 23:00\nThursday 20:00 - 23:00\nSunday 20:00 - 23:00"]);
        Usp::create(['title' => 'Raid times', 'value' => "Wednesday 20:00 - 23:00\nThursday 20:00 - 23:00\nSunday 20:00 - 23:00"]);
        Usp::create(['title' => 'Raid times', 'value' => "Wednesday 20:00 - 23:00\nThursday 20:00 - 23:00\nSunday 20:00 - 23:00"]);
    }
}
