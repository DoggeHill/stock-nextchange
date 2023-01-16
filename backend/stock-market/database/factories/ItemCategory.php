<?php

namespace Database\Factories;

use App\Models\Item;
use Illuminate\Database\Eloquent\Factories\Factory;
use App\Enums\CategoryTypeEnum;


class ItemCategoryFactory extends Factory
{
    protected $model = ItemCategory::class;

    public function definition(): array
    {
        $enumsArr = CategoryTypeEnum::cases();
        $values = array_column($enumsArr, 'value');
        return [
    	    'title' => $this->faker->sentence(),
    	    'type' => $this->faker->$arrayValues[rand(0,4)]
    	];
    }
    
}
