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
            $table->string('title')->nullable(false)->unique(true);
            $table->string('description')->nullable(true);
            $table->string('location')->nullable(false);
            $table->timestamps();
            // define foreign key
            $table->foreignId('auction_house_category_id')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->nullable(false);
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
