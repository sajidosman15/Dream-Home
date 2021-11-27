<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
class WriteController extends Controller
{


    public function doRegistration(Request $request){

        function sanitizeData($data){
            $data=trim($data);
            $data=stripslashes($data);
            $data=htmlspecialchars($data);
            return $data;
        }

        $fnameError=0;
        $lnameError=0;
        $emailError=0;
        $genderError=0;
        $districtError=0;
        $phoneError=0;
        $passError=0;
        $errors;

        $body=$request->get('body');
        $body=json_decode($body);

        $fname = sanitizeData($body->fname);
        $lname = sanitizeData($body->lname);
        $email = sanitizeData($body->email);
        $gender = sanitizeData($body->gender);
        $district = sanitizeData($body->district);
        $phone = sanitizeData($body->phone);
        $pass = sanitizeData($body->pass);
        $cpass = sanitizeData($body->cpass);

        if(strlen($fname)<=0){
            $fnameError=1;
            $errors[0]="First name can't be empty";
        }
        else{
            $errors[0]="";
        }

        if(strlen($lname)<=0){
            $errors[1]="Last name can't be empty";
            $lnameError=1;
        }
        else{
            $errors[1]="";
        }

        if(strlen($email)<=0){
            $errors[2]="Email can't be empty";
            $emailError=1;
        }
        else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors[2]="Invalid email";
            $emailError=1;
        }
        else{
            $duplicate=DB::table('users')
            ->select('email')
            ->where('email','=',$email)
            ->first();

            if($duplicate===null){
                $errors[2]="";
            }
            else{
                $errors[2]="Email is already used";
                $emailError=1;
            }
            
        }

        if(strlen($gender)<=0){
            $errors[3]="Gender can't be empty";
            $genderError=1;
        }
        else if(strcmp($gender,"Male")!==0 && strcmp($gender,"Female")!==0){
            $errors[3]="Gender does not match";
            $genderError=1;
        }
        else{
            $errors[3]="";
        }

        if(strlen($district)<=0){
            $errors[4]="District can't be empty";
            $districtError=1;
        }
        else{
            $errors[4]="";
        }

        if(strlen($phone)>=12 || strlen($phone)<=5){
            $errors[5]="Invalid phone";
            $phoneError=1;
        }
        else{
            $errors[5]="";
        }

        if(strlen($pass)<=0){
            $errors[6]="Password Can't be empty";
            $passError=1;
        }
        else if(strlen($pass)<=3){
            $errors[6]="Password must be atleast 4 character";
            $passError=1;
        }
        else{
            $errors[6]="";
        }

        if($fnameError==0&&$lnameError==0&&$emailError==0&&$genderError==0&&$districtError==0&&$phoneError==0&&$passError==0){

            if($pass==$cpass){
                $data=array();
                $data['fname']=$fname;
                $data['lname']=$lname;
                $data['email']=$email;
                $data['gender']=$gender;
                $data['district']=$district;
                $data['mobile']=$phone;
                $data['password']=md5($pass);

                try{
                    $account=DB::table('users')->insert($data);
                    if($account){
                        $errors[8]="Success";
                    }
                    else{
                        $errors[8]="Fail";
                    }
                }catch(Exception $ex){
                    $errors[8]="Fail";
                }


                $errors[7]="";
            }
            else{
                $errors[7]="Password does not match";
            }
        }

        return $errors;
    }

    public function uploadAdvertisement(Request $request){
        function sanitizeData($data){
            $data=trim($data);
            $data=stripslashes($data);
            $data=htmlspecialchars($data);
            return $data;
        }

        $errorMsg;
        $error=0;
        
        $user_id=$request->input('user_id');
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
        $image1 = $request->file('image1');
        $image2 = $request->file('image2');


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

        if(!$request->hasFile('image1')){
            $errorMsg[11]="red";
            $error=1;
        }
        else{
            $errorMsg[11]="black";
        }

        if(!$request->hasFile('image2')){
            $errorMsg[12]="red";
            $error=1;
        }
        else{
            $errorMsg[12]="black";
        }

        // return $error;


        // all set to go
        if($error===0){
            $image1name  = $image1->getClientOriginalName();
            $extension = $image1->getClientOriginalExtension();
            $picture   = date('His').'-'.$image1name;
            
            $image2name  = $image2->getClientOriginalName();
            $extension2 = $image2->getClientOriginalExtension();
            $picture2   = date('His').'-'.$image2name;
            

            $finaldata=array();
            $finaldata['user_id']=$user_id;
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
            $finaldata['image1']=$picture;
            $finaldata['image2']=$picture2;

            try{
                $image1->move(public_path('img'), $picture);
                $image2->move(public_path('img'), $picture2);
                $advertisement=DB::table('properties')->insert($finaldata);
                if($advertisement){
                    $errorMsg[13]="Success";
                }
                else{
                    $errorMsg[13]="Fail";
                }
            }catch(Exception $ex){
                $errorMsg[13]="Fail";
            }
        }


        return $errorMsg;

    }
}
