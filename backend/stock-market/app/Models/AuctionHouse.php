<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AuctionHouse extends Model
{
    use HasFactory; 
    //

    public $table = 'auction_houses';

    protected $fillable = ['title', 'type', 'auctions', 'location', 'auction_house_category_id', 'description'];

    /**
     * @return BelongsTo
     * @description get the category for the blog post.
     */
    public function category(): HasOne
    {
        return $this->belongsTo(AuctionHouseCategory::class);
    }
}
