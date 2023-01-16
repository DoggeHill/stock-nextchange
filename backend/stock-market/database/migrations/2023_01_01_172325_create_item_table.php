<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable(false)->unique(true);
            $table->double('initial_price')->nullable(false);
            $table->date('date_started')->nullable(false);
            $table->date('date_finish')->nullable(false);
            $table->string('description')->nullable(false);
            $table->string('image');
            $table->timestamps();
            // define foreign key
            $table->foreignId('auction_house_id')
                ->onUpdate('cascade')
                ->onDelete('set null')
                ->nullable(false);
                $table->foreignId('user_id')
                ->onUpdate('cascade')
                ->onDelete('set null')
                ->nullable(false);
                $table->foreignId('item_category_id')
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
        Schema::dropIfExists('item');
    }
}
