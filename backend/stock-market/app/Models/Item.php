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
    protected $fillable = ['title', 'type', 'initial_price', 'date_started', 'date_finish'];

    public function auctionHouse() {
        return $this->hasOne(AuctionHouse::class);
    }

    public function bid() {
        return $this->hasMany(Bid:class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}