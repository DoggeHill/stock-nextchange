<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuctionHouse extends Model
{
    use HasFactory; 
    //

    public $table = 'auction_houses';

    protected $fillable = ['title', 'location', 'auction_house_category_id', 'description', 'image'];

    /**
     * @return BelongsTo
     * @description get the category for the blog post.
     */
    public function auctionHouseCategory(): BelongsTo
    {
        return $this->belongsTo(AuctionHouseCategory::class);
    }
}
