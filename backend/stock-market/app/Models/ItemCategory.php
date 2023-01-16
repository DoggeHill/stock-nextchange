<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Enums\CategoryTypeEnum;

class ItemCategory extends Model
{
    use HasFactory;
    /**
     * @return HasMany
     * @description get all posts for the category
     */

    public $table = 'item_category';

    protected $fillable = ['title', 'type'];

    public function category()
    {
        return $this->hasOne(AuctionHouseCategory::class);
    }
    public function item()
    {
        return $this->hasOne(Item::class);
    }
}
