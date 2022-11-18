<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAuctionHousesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('auction_houses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('type');
            $table->string('description');
            $table->string('location');
            $table->string('auctions')->nullable();
            $table->timestamps();
            // define foreign key
            $table->foreignId('auction_house_category_id')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('auction_houses');
    }
}
