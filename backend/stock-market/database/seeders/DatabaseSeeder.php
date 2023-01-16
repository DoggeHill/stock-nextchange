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
        // $auctionHouse = [];
        // // create 10 auction house categories
        // \App\Models\AuctionHouseCategory::factory()->count(0)->create()->each(function ($category) {
        //     // Create 10 auction houses for each category
        //     $auctionHouse = \App\Models\AuctionHouse::factory()->count(rand(0, 3))->make();
        //     $category->posts()->saveMany($auctionHouse);
        // });

         \App\Models\User::factory()->count(10)->create();
         
        
         //\App\Models\ItemCategory::factory()->count(4)->create();
    }
}
