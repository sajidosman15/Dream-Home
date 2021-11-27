<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class UpdateController extends Controller
{
    public function deletePosts(Request $request){
        $id=$request->get('body');
        $id=json_decode($id);

        if ($request->isMethod('POST')) {
            $images=DB::table('properties')
            ->select('image1','image2')
            ->where('id','=',$id)
            ->first();
            unlink("img/".$images->image1);
            unlink("img/".$images->image2);

            $posts=DB::table('properties')
            ->where('id', '=', $id)
            ->delete();
            return response()->json($posts); 
        }
    }

    public function updatePost(Request $request){
        function sanitizeData($data){
            $data=trim($data);
            $data=stripslashes($data);
            $data=htmlspecialchars($data);
            return $data;
        }

        $errorMsg;
        $error=0;
        
        $id=$request->input('id');
        $PName=sanitizeData($request->input('PName'));
        $PType=sanitizeData($request->input('PType'));
        $division=sanitizeData($request->input('division'));
        $district=sanitizeData($request->input('district'));
        $upazilla=sanitizeData($request->input('upazilla'));
        $address=sanitizeData($request->input('address'));
        $PSize=(int)sanitizeData($request->input('PSize'));
        $BedRoom=(int)sanitizeData($request->input('BedRoom'));
        $DrawingRoom=(int)sanitizeData($request->input('DrawingRoom'));
        $DiningRoom=(int)sanitizeData($request->input('DiningRoom'));
        $ServantRoom=(int)sanitizeData($request->input('ServantRoom'));
        $Kitchen=(int)sanitizeData($request->input('Kitchen'));
        $AttachBath=(int)sanitizeData($request->input('AttachBath'));
        $CommonBath=(int)sanitizeData($request->input('CommonBath'));
        $Balcony=(int)sanitizeData($request->input('Balcony'));
        $FloorLevel=(int)sanitizeData($request->input('FloorLevel'));
        $Description=sanitizeData($request->input('Description'));
        $GasConnection=(int)sanitizeData($request->input('GasConnection'));
        $Generator=(int)sanitizeData($request->input('Generator'));
        $WasaConnection=(int)sanitizeData($request->input('WasaConnection'));
        $Lift=(int)sanitizeData($request->input('Lift'));
        $CCTV=(int)sanitizeData($request->input('CCTV'));
        $Parking=(int)sanitizeData($request->input('Parking'));
        $InterCom=(int)sanitizeData($request->input('InterCom'));
        $WiFi=(int)sanitizeData($request->input('WiFi'));
        $SecurityAlarm=(int)sanitizeData($request->input('SecurityAlarm'));
        $CableTV=(int)sanitizeData($request->input('CableTV'));
        $Pool=(int)sanitizeData($request->input('Pool'));
        $Gymnasiun=(int)sanitizeData($request->input('Gymnasiun'));
        $Garden=(int)sanitizeData($request->input('Garden'));
        $Cleaning=(int)sanitizeData($request->input('Cleaning'));
        $HouseRent=(int)sanitizeData($request->input('HouseRent'));
        $GasBill=(int)sanitizeData($request->input('GasBill'));
        $ServiceCharge=(int)sanitizeData($request->input('ServiceCharge'));
        $SecurityDeposit=(int)sanitizeData($request->input('SecurityDeposit'));
        $OwnerName=sanitizeData($request->input('OwnerName'));
        $EmailAddress=sanitizeData($request->input('EmailAddress'));
        $PhoneNumber=sanitizeData($request->input('PhoneNumber'));


        if(strlen($PName)<=0){
            $errorMsg[0]="red";
            $error=1;
        }
        else{
            $errorMsg[0]="black";
        }
        if(strlen($address)<=0){
            $errorMsg[1]="red";
            $error=1;
        }
        else{
            $errorMsg[1]="black";
        }
        if($PSize<=0){
            $errorMsg[2]="red";
            $error=1;
        }
        else{
            $errorMsg[2]="black";
        }
        if(strlen($Description)<=0){
            $errorMsg[3]="red";
            $error=1;
        }
        else{
            $errorMsg[3]="black";
        }
        if($HouseRent<=0){
            $errorMsg[4]="red";
            $error=1;
        }
        else{
            $errorMsg[4]="black";
        }
        if($GasBill<=0){
            $errorMsg[5]="red";
            $error=1;
        }
        else{
            $errorMsg[5]="black";
        }
        if($ServiceCharge<=0){
            $errorMsg[6]="red";
            $error=1;
        }
        else{
            $errorMsg[6]="black";
        }
        if($SecurityDeposit<=0){
            $errorMsg[7]="red";
            $error=1;
        }
        else{
            $errorMsg[7]="black";
        }
        if(strlen($OwnerName)<=0){
            $errorMsg[8]="red";
            $error=1;
        }
        else{
            $errorMsg[8]="black";
        }
        if(strlen($EmailAddress)<=0 || !filter_var($EmailAddress, FILTER_VALIDATE_EMAIL)){
            $errorMsg[9]="red";
            $error=1;
        }
        else{
            $errorMsg[9]="black";
        }
        if(strlen($PhoneNumber)<=0){
            $errorMsg[10]="red";
            $error=1;
        }
        else{
            $errorMsg[10]="black";
        }



        // return $error;


        // all set to go
        if($error===0){

            $finaldata=array();
            $finaldata['PName']=$PName;
            $finaldata['PType']=$PType;
            $finaldata['division']=$division;
            $finaldata['district']=$district;
            $finaldata['upazilla']=$upazilla;
            $finaldata['address']=$address;
            $finaldata['PSize']=$PSize;
            $finaldata['BedRoom']=$BedRoom;
            $finaldata['DrawingRoom']=$DrawingRoom;
            $finaldata['DiningRoom']=$DiningRoom;
            $finaldata['ServantRoom']=$ServantRoom;
            $finaldata['Kitchen']=$Kitchen;
            $finaldata['AttachBath']=$AttachBath;
            $finaldata['CommonBath']=$CommonBath;
            $finaldata['Balcony']=$Balcony;
            $finaldata['FloorLevel']=$FloorLevel;
            $finaldata['Description']=$Description;
            $finaldata['GasConnection']=$GasConnection;
            $finaldata['Generator']=$Generator;
            $finaldata['WasaConnection']=$WasaConnection;
            $finaldata['Lift']=$Lift;
            $finaldata['CCTV']=$CCTV;
            $finaldata['Parking']=$Parking;
            $finaldata['InterCom']=$InterCom;
            $finaldata['WiFi']=$WiFi;
            $finaldata['SecurityAlarm']=$SecurityAlarm;
            $finaldata['CableTV']=$CableTV;
            $finaldata['Pool']=$Pool;
            $finaldata['Gymnasiun']=$Gymnasiun;
            $finaldata['Garden']=$Garden;
            $finaldata['Cleaning']=$Cleaning;
            $finaldata['HouseRent']=$HouseRent;
            $finaldata['GasBill']=$GasBill;
            $finaldata['ServiceCharge']=$ServiceCharge;
            $finaldata['SecurityDeposit']=$SecurityDeposit;
            $finaldata['OwnerName']=$OwnerName;
            $finaldata['EmailAddress']=$EmailAddress;
            $finaldata['PhoneNumber']=$PhoneNumber;

            try{

                $advertisement=DB::table('properties')
                ->where('id', $id)
                ->update($finaldata);
                if($advertisement){
                    $errorMsg[11]="Success";
                }
                else{
                    $errorMsg[11]="Fail";
                }
            }catch(Exception $ex){
                $errorMsg[11]="Fail";
            }
        }


        return $errorMsg;

    }
}
