<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // create 10 categories
        \App\Models\AuctionHouseCategory::factory()->count(10)->create()->each(function ($category) {

            // Create 10 posts for each category
            $posts = \App\Models\AuctionHouse::factory()->count(10)->make();
            $category->posts()->saveMany($posts);

        });
    }
}
