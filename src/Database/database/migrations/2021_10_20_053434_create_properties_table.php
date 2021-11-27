<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id('id');
            $table->unsignedBigInteger('user_id');
            $table->string('PName');
            $table->string('PType');
            $table->string('division');
            $table->string('district');
            $table->string('upazilla');
            $table->text('address');
            $table->integer('PSize');
            $table->integer('BedRoom');
            $table->integer('DrawingRoom');
            $table->integer('DiningRoom');
            $table->integer('ServantRoom');
            $table->integer('Kitchen');
            $table->integer('AttachBath');
            $table->integer('CommonBath');
            $table->integer('Balcony');
            $table->integer('FloorLevel');
            $table->text('Description');
            $table->integer('GasConnection');
            $table->integer('Generator');
            $table->integer('WasaConnection');
            $table->integer('Lift');
            $table->integer('CCTV');
            $table->integer('Parking');
            $table->integer('InterCom');
            $table->integer('WiFi');
            $table->integer('SecurityAlarm');
            $table->integer('CableTV');
            $table->integer('Pool');
            $table->integer('Gymnasiun');
            $table->integer('Garden');
            $table->integer('Cleaning');
            $table->integer('HouseRent');
            $table->integer('GasBill');
            $table->integer('ServiceCharge');
            $table->integer('SecurityDeposit');
            $table->string('OwnerName');
            $table->string('EmailAddress');
            $table->string('PhoneNumber');
            $table->integer('like')->nullable();
            $table->integer('comments')->nullable();
            $table->string('image1');
            $table->string('image2');
            $table->timestamps();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('properties');
    }
}
