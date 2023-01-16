<?php

namespace Database\Factories;

use App\Models\Bid;
use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class ItemFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
    	return [
    	    'title' => $this->faker->sentence(),
    	    'type' => $this->faker->words(2, true),
    	    'initial_price' => $this->faker->numberBetween(10,20),
    	    'date_started' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    	    'date_finish' => $this->faker->date($format = 'Y-m-d', $max = 'now'),
    	];
    }
}
