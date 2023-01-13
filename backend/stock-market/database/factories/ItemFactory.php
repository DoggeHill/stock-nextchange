<?php

namespace Database\Factories;

use App\Models\Bid;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuctionHouseFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
    	return [
            ['title', 'type', 'price', 'initial_price', 'date_started', 'date_finish'];
    	    'title' => $this->faker->sentence,
    	    'type' => $this->faker->word,
    	    'initial_price' => $this->faker->numberBetween(10,20),
    	    'date_started' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    	    'date_finish' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    	];
    }
}
