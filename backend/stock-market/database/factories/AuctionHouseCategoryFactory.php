<?php

namespace Database\Factories;

use App\Models\AuctionHouseCategory;
use App\Models\AuctionHouse;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuctionHouseCategoryFactory extends Factory
{
    protected $model = AuctionHouseCategory::class;

    public function definition(): array
    {
    	return [
    	    'title' => $this->faker->title(),
            'type' => $this->faker->title()
    	];
    }
}
