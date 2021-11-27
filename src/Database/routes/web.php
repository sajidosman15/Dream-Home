<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReadController;
use Illuminate\Http\Request;


// header("Access-Control-Allow-Origin:", "*");
// header("Access-Control-Allow-Methods:", "PUT, GET, POST");
// header("Access-Control-Allow-Headers:", "Origin, Content-Type, X-Auth-Token");



Route::get('/', function () {
    return view('welcome');
});

Route::get('/test', function () {
    $duplicate=DB::table('users')
    ->select('email')
    ->where('email','=','sajida@gmail.com')
    ->first();
    if($duplicate===null){
        echo("null");
    }
    // $districts=DB::table('locations')
    //         ->distinct()
    //         ->select('district')
    //         ->get();
    //         return response()->json($districts);
});
