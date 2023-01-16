<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Bid extends Model
{
    use HasFactory;
      /**
     * @return HasMany
     * @description get all posts for the category
     */
    public $table = 'bid';
    protected $fillable = ['price', 'date', 'item_id', 'user_id'];

    public function item() {
        return $this->hasOne(Item::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}