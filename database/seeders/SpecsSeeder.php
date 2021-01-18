<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Spec;

class SpecsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Spec::create(['class' => 'Death Knight', 'spec' => 'Unholy']);
        Spec::create(['class' => 'Death Knight', 'spec' => 'Blood']);
        Spec::create(['class' => 'Death Knight', 'spec' => 'Frost']);

        Spec::create(['class' => 'Demon Hunter', 'spec' => 'Vengeance']);
        Spec::create(['class' => 'Demon Hunter', 'spec' => 'Havoc']);

        Spec::create(['class' => 'Druid', 'spec' => 'Restoration']);
        Spec::create(['class' => 'Druid', 'spec' => 'Guardian']);
        Spec::create(['class' => 'Druid', 'spec' => 'Balance']);
        Spec::create(['class' => 'Druid', 'spec' => 'Feral']);

        Spec::create(['class' => 'Hunter', 'spec' => 'Beast Mastery']);
        Spec::create(['class' => 'Hunter', 'spec' => 'Marksmanship']);
        Spec::create(['class' => 'Hunter', 'spec' => 'Survival']);

        Spec::create(['class' => 'Priest', 'spec' => 'Discipline']);
        Spec::create(['class' => 'Priest', 'spec' => 'Shadow']);
        Spec::create(['class' => 'Priest', 'spec' => 'Holy']);

        Spec::create(['class' => 'Rogue', 'spec' => 'Assassination']);
        Spec::create(['class' => 'Rogue', 'spec' => 'Subtlety']);
        Spec::create(['class' => 'Rogue', 'spec' => 'Outlaw']);

        Spec::create(['class' => 'Monk', 'spec' => 'Brewmaster']);
        Spec::create(['class' => 'Monk', 'spec' => 'Windwalker']);
        Spec::create(['class' => 'Monk', 'spec' => 'Mistweaver']);

        Spec::create(['class' => 'Shaman', 'spec' => 'Restoration']);
        Spec::create(['class' => 'Shaman', 'spec' => 'Enhancement']);
        Spec::create(['class' => 'Shaman', 'spec' => 'Elemental']);

        Spec::create(['class' => 'Paladin', 'spec' => 'Retribution']);
        Spec::create(['class' => 'Paladin', 'spec' => 'Protection']);
        Spec::create(['class' => 'Paladin', 'spec' => 'Holy']);

        Spec::create(['class' => 'Mage', 'spec' => 'Arcane']);
        Spec::create(['class' => 'Mage', 'spec' => 'Frost']);
        Spec::create(['class' => 'Mage', 'spec' => 'Fire']);

        Spec::create(['class' => 'Warlock', 'spec' => 'Destruction']);
        Spec::create(['class' => 'Warlock', 'spec' => 'Affliction']);
        Spec::create(['class' => 'Warlock', 'spec' => 'Demonology']);

        Spec::create(['class' => 'Warrior', 'spec' => 'Protection']);
        Spec::create(['class' => 'Warrior', 'spec' => 'Fury']);
        Spec::create(['class' => 'Warrior', 'spec' => 'Arms']);
    }
}
