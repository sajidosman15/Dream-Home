<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReadController;
use App\Http\Controllers\WriteController;
use App\Http\Controllers\UpdateController;



Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/readdistrict',[ReadController::class,'readDistrict']);
Route::post('/readdistrict2',[ReadController::class,'readDistrict2']);
Route::post('/readdivision',[ReadController::class,'readDivision']);
Route::post('/readupazilla',[ReadController::class,'readUpazilla']);
Route::post('/fetchposts',[ReadController::class,'fetchPosts']);
Route::post('/searchposts',[ReadController::class,'searchPosts']);
Route::post('/fetchmyposts',[ReadController::class,'fetchMyPosts']);
Route::post('/fetchpostslimit',[ReadController::class,'fetchPostsLimit']);
Route::post('/fetchpostsall',[ReadController::class,'fetchPostsAll']);
Route::post('/login',[ReadController::class,'login']);
Route::post('/registration',[WriteController::class,'doRegistration']);
Route::post('/uploadads',[WriteController::class,'uploadAdvertisement']);
Route::post('/deletepost',[UpdateController::class,'deletePosts']);
Route::post('/updates',[UpdateController::class,'updatePost']);



