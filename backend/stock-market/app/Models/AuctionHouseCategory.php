<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AuctionHouseCategory extends Model
{
    use HasFactory;
    /**
     * @return HasMany
     * @description get all posts for the category
     */

    public $table = 'auction_house_category';

    protected $fillable = ['title', 'item_category_id'];

    public function posts()
    {
        return $this->hasMany(AuctionHouse::class);
    }
    public function type()
    {
        return $this->hasOne(ItemCategory::class);
    }
}
