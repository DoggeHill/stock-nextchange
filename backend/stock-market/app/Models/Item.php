<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Item extends Model
{
    use HasFactory;
      /**
     * @return HasMany
     * @description get all posts for the category
     */
    public $table = 'item';
    protected $fillable = ['title', 'initial_price', 'date_started', 'date_finish', 'auction_house_id', 'user_id', 'item_category_id', 'description', 'image'];

    public function auctionHouse() {
        return $this->hasOne(AuctionHouse::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function type() {
        return $this->hasOne(ItemCategory::class);
    }
    
}