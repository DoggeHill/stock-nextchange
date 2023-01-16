<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBitTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bid', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->double('price', 15, 8)->nullable(false);
            $table->date('date')->nullable(false);
            $table->foreignId('item_id')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->nullable(false);
            $table->foreignId('user_id')
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
        Schema::dropIfExists('bit');
    }
}
