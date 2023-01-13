<?php

namespace Database\Factories;

use App\Models\AuctionHouse;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuctionHouseFactory extends Factory
{
    protected $model = AuctionHouse::class;

    public function definition(): array
    {
    	return [
    	    'title' => $this->faker->sentence,
            'location' -> $this->faker->sentence,
            'description'=> $this->faker->sentence,
            'type'=> $this->faker->sentence,
            'auctions'=> $this->faker->sentence,
    	];
    }
}
