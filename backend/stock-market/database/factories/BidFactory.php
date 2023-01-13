<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class AuctionHouseFactory extends Factory
{
    protected $model = Item::class;

    public function definition(): array
    {
    	return [
    	    'price' => $this->faker->numberBetween(10,20),
    	    'date' => $this->faker->date($format = 'Y-m-d', $max = 'now')
    	];
    }
    
}
