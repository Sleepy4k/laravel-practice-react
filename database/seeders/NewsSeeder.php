<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Seeder;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (News::count() == 0) {
            $grades = News::factory(50)->make();

            News::insert($grades->toArray());
        }
    }
}
