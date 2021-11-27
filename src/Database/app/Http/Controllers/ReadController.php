<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class ReadController extends Controller
{
    public function fetchPostsAll(Request $request){
        $id=$request->get('id');
        $id=json_decode($id);

        if ($request->isMethod('POST')) {
            $posts=DB::table('properties')
            ->select('*')
            ->where('id','=',$id)
            ->first();
            return response()->json($posts);
        }
    } 
    
    public function fetchPostsLimit(Request $request){
        if ($request->isMethod('POST')) {
            $posts=DB::table('properties')
            ->select('id','PName','image1','address','HouseRent','BedRoom','AttachBath','CommonBath','PSize','Pool','WiFi','Cleaning','like','comments')
            ->limit(6)
            ->get();
            return response()->json($posts);
        }
    } 
    
    public function fetchMyPosts(Request $request){
        $id=$request->get('body');
        $id=json_decode($id);

        if ($request->isMethod('POST')) {
            $posts=DB::table('properties')
            ->select('id','PName','image1','address','HouseRent','BedRoom','AttachBath','CommonBath','PSize','Pool','WiFi','Cleaning','like','comments')
            ->where('user_id','=',$id)
            ->get();
            return response()->json($posts); 
        }
    }

    public function fetchPosts(Request $request){
        $body=$request->get('body');
        $body=json_decode($body);
        $division= $body->division;
        $district=$body->district;
        $upazilla=$body->upazilla;
        $type=$body->type;
        $price=$body->price;
        if ($request->isMethod('POST')) {
            if($division==="" && $district==="" && $upazilla==="" && $type==="" && $price===""){
                $posts=DB::table('properties')
                ->select('id','PName','image1','address','HouseRent','BedRoom','AttachBath','CommonBath','PSize','Pool','WiFi','Cleaning','like','comments')
                ->get();
                return response()->json($posts);
            }
        }
    }

    public function searchPosts(Request $request){
        $body=$request->get('body');
        $body=json_decode($body);
        $division= $body->division;
        $district=$body->district;
        $upazilla=$body->upazila;
        $type=$body->type;
        $price=$body->price;

        if($division==="undefined"){
            $division='%';
        }
        if($district==="undefined"){
            $district='%';
        }
        if($upazilla==="undefined"){
            $upazilla='%';
        }
        if($type==="undefined"){
            $type='%';
        }
        
        if ($request->isMethod('POST')) {
            $posts=DB::table('properties')
            ->select('id','PName','image1','address','HouseRent','BedRoom','AttachBath','CommonBath','PSize','Pool','WiFi','Cleaning','like','comments')
            ->Where('division', 'like', $division)
            ->Where('district', 'like', $district)
            ->Where('upazilla', 'like', $upazilla)
            ->Where('PType', 'like', $type)
            ->Where('HouseRent', '<=',$price)
            ->get();
            return response()->json($posts);
        }
    }    
    
    public function readDistrict(Request $request){

        if ($request->isMethod('POST')) {
            $districts=DB::table('locations')
            ->distinct()
            ->select('district')
            ->get();
            return response()->json($districts);
        }
    }

    public function readDistrict2(Request $request){
        $body=$request->get('body');
        $body=json_decode($body);
        if ($request->isMethod('POST')) {
            $districts=DB::table('locations')
            ->distinct()
            ->select('district')
            ->where('division','=',$body)
            ->get();
            return response()->json($districts);
        }
    }

    public function readDivision(Request $request){
        if ($request->isMethod('POST')) {
            $division=DB::table('locations')
            ->distinct()
            ->select('division')
            ->get();
            return response()->json($division);
        }
    }

    public function readUpazilla(Request $request){
        $body=$request->get('body');
        $body=json_decode($body);
        if ($request->isMethod('POST')) {
            $upazilla=DB::table('locations')
            ->distinct()
            ->select('upazilla')
            ->where('district','=',$body)
            ->get();
            return response()->json($upazilla);
        }
    }

    public function login(Request $request){
        $emailError=0;
        $passError=0;
        $errors;

        $email = htmlspecialchars(stripslashes(trim(str_replace('"','',$request->get('email')))));
        $pass = htmlspecialchars(stripslashes(trim(str_replace('"','',$request->get('pass')))));

        if(strlen($email)<=0){
            $errors[0]="Email can't be empty";
            $emailError=1;
        }
        else{
            $errors[0]="";
        }

        if(strlen($pass)<=0){
            $errors[1]="Password can't be empty";
            $passError=1;
        }
        else{
            $errors[1]="";
        }

        if($emailError==0&&$passError==0){
            $pass=md5($pass);

            try{
                $account=DB::table('users')
                ->select('*')
                ->where('email','=',$email)
                ->where('password','=',$pass)
                ->first();
                if($account===null){
                    $errors[2]="Fail";
                }
                else{
                    $errors[2]=$account->id;
                }
            }
            catch(Exception $ex){
                $errors[2]="Fail";
            }
            
        }
        // if ($request->isMethod('POST')) {
        //     $districts=DB::table('locations')
        //     ->distinct()
        //     ->select('district')
        //     ->get();
        //     return response()->json($districts);
        // }

        return $errors;
    }
}
