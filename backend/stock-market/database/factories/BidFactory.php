<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;

class BidFactory extends Factory
{
    protected $model = Bid::class;

    public function definition(): array
    {
    	return [
    	    'price' => $this->faker->numberBetween(10,20),
    	    'date' => $this->faker->date($format = 'Y-m-d', $max = 'now')
    	];
    }
    
}
