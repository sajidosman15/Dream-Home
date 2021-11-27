import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import { useState, Component, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import swal from 'sweetalert';


class Handeler extends Component {

    async fetchDynamic(data, path) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/${path}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                body: JSON.stringify(data),

            })
            status = response;

        } catch (err) {
            status = err.response;
        }

        return status;
    }

    async submitData(data, path) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/${path}`, data)
            status = response;
        } catch (err) {
            status = err.response;
        }
        return status;
    }
}

function UploadAds() {

    require('../StyleSheet/UploadAds.css');

    var rowData = {
        PName: "",
        PType: "Hostel",
        division: "",
        district: "",
        upazilla: "",
        address: "",
        PSize: "",
        BedRoom: "0",
        DrawingRoom: "0",
        DiningRoom: "0",
        ServantRoom: "0",
        Kitchen: "0",
        AttachBath: "0",
        CommonBath: "0",
        Balcony: "0",
        FloorLevel: "0",
        Description: "",
        GasConnection: "0",
        Generator: "0",
        WasaConnection: "0",
        Lift: "0",
        CCTV: "0",
        Parking: "0",
        InterCom: "0",
        WiFi: "0",
        SecurityAlarm: "0",
        CableTV: "0",
        Pool: "0",
        Gymnasiun: "0",
        Garden: "0",
        Cleaning: "0",
        HouseRent: "",
        GasBill: "",
        ServiceCharge: "",
        SecurityDeposit: "",
        OwnerName: "",
        EmailAddress: "",
        PhoneNumber: "",
        image1: new FormData(),
        image2: new FormData(),
    }

    var arr = new Array();
    const [data, updateData] = useState(rowData);
    const [errorMessage, updateError] = useState(arr);
    const [districts, setDistrict] = useState(arr);
    const [divisions, setDivision] = useState(arr);
    const [upazilla, setUpazilla] = useState(arr);
    const [refresh,updateRefresh]=useState(null);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step
        const fetchdivision = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/readdivision`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json',
                    },
                    cancelToken: ourRequest.token, // <-- 2nd step
                })
                setDivision(response.data);
                updateData((preValue) => {
                    return ({
                        ...preValue,
                        ['division']: response.data[0].division,
                    });
                });

                var worker = new Handeler();
                worker.fetchDynamic(response.data[0].division, 'readdistrict2').then(response => {
                    if (response.status === 200) {
                        var valuedis = response.data;
                        var district = valuedis[0].district;
                        setDistrict(valuedis);
                        updateData((preValue) => {
                            return ({
                                ...preValue,
                                ['district']: valuedis[0].district,
                            });
                        });

                        worker.fetchDynamic(district, 'readupazilla').then(response => {
                            if (response.status === 200) {
                                var valuedis = response.data;
                                setUpazilla(valuedis);
                                updateData((preValue) => {
                                    return ({
                                        ...preValue,
                                        ['upazilla']: valuedis[0].upazilla,
                                    });
                                });
                            }
                            else {

                            }
                        });
                    }
                    else {

                    }
                });

            } catch (err) {

            }
        }
        fetchdivision();

        return () => {
            ourRequest.cancel() // <-- 3rd step
        }
    }, [])

    const token = localStorage.getItem('token');
    if (token === null) {
        return <Redirect to="/login" />
    } else {

        const printDivision = (val, key) => {
            return (
                <option key={key} value={val.division}>{val.division}</option>
            );
        }
        const printDistrict = (val, key) => {
            return (
                <option key={key} value={val.district}>{val.district}</option>
            );
        }
        const printUpazilla = (val, key) => {
            return (
                <option key={key} value={val.upazilla}>{val.upazilla}</option>
            );
        }

        const fileEvent = (e) => {
            var name = e.target.name;
            var image = e.target.files[0];

            if (typeof image !== 'undefined') {
                var imageName = image.name;
                var fileType = image.type;
            }
            const imageData = new FormData();
            imageData.append('image', image);


            updateData((preValue) => {
                return ({
                    ...preValue,
                    [name]: imageData,
                });
            });

            // console.log(ImageData);
        }


        const inputEvent = (e) => {
            var name = e.target.name;
            var value = e.target.value;
            
            if (name === 'division') {
                var worker = new Handeler();
                worker.fetchDynamic(value, 'readdistrict2').then(response => {
                    if (response.status === 200) {
                        var valuedis = response.data;
                        var district = valuedis[0].district;
                        setDistrict(valuedis);
                        updateData((preValue) => {
                            return ({
                                ...preValue,
                                ['district']: valuedis[0].district,
                            });
                        });

                        worker.fetchDynamic(district, 'readupazilla').then(response => {
                            if (response.status === 200) {
                                var valuedis = response.data;
                                setUpazilla(valuedis);
                                updateData((preValue) => {
                                    return ({
                                        ...preValue,
                                        ['upazilla']: valuedis[0].upazilla,
                                    });
                                });
                            }
                            else {

                            }
                        });
                    }
                    else {

                    }
                });
            }
            if (name === 'district') {
                var worker = new Handeler();
                worker.fetchDynamic(value, 'readupazilla').then(response => {
                    if (response.status === 200) {
                        var valuedis = response.data;
                        setUpazilla(valuedis);
                        updateData((preValue) => {
                            return ({
                                ...preValue,
                                ['upazilla']: valuedis[0].upazilla,
                            });
                        });
                    }
                    else {

                    }
                });
            }
            updateData((preValue) => {
                return ({
                    ...preValue,
                    [name]: value,
                });
            });
        }

        const submitForm = (e) => {
            e.preventDefault();

            const formdata = new FormData();
            formdata.append('image1', data.image1.get('image'));
            formdata.append('image2', data.image2.get('image'));
            formdata.append('user_id', localStorage.getItem('token'));
            formdata.append('PName', data.PName);
            formdata.append('PType', data.PType);
            formdata.append('division', data.division);
            formdata.append('district', data.district);
            formdata.append('upazilla', data.upazilla);
            formdata.append('address', data.address);
            formdata.append('PSize', data.PSize);
            formdata.append('BedRoom', data.BedRoom);
            formdata.append('DrawingRoom', data.DrawingRoom);
            formdata.append('DiningRoom', data.DiningRoom);
            formdata.append('ServantRoom', data.ServantRoom);
            formdata.append('Kitchen', data.Kitchen);
            formdata.append('AttachBath', data.AttachBath);
            formdata.append('CommonBath', data.CommonBath);
            formdata.append('Balcony', data.Balcony);
            formdata.append('FloorLevel', data.FloorLevel);
            formdata.append('Description', data.Description);
            formdata.append('GasConnection', data.GasConnection);
            formdata.append('Generator', data.Generator);
            formdata.append('WasaConnection', data.WasaConnection);
            formdata.append('Lift', data.Lift);
            formdata.append('CCTV', data.CCTV);
            formdata.append('Parking', data.Parking);
            formdata.append('InterCom', data.InterCom);
            formdata.append('WiFi', data.WiFi);
            formdata.append('SecurityAlarm', data.SecurityAlarm);
            formdata.append('CableTV', data.CableTV);
            formdata.append('Pool', data.Pool);
            formdata.append('Gymnasiun', data.Gymnasiun);
            formdata.append('Garden', data.Garden);
            formdata.append('Cleaning', data.Cleaning);
            formdata.append('HouseRent', data.HouseRent);
            formdata.append('GasBill', data.GasBill);
            formdata.append('ServiceCharge', data.ServiceCharge);
            formdata.append('SecurityDeposit', data.SecurityDeposit);
            formdata.append('OwnerName', data.OwnerName);
            formdata.append('EmailAddress', data.EmailAddress);
            formdata.append('PhoneNumber', data.PhoneNumber);

            var worker = new Handeler();
            worker.submitData(formdata, 'uploadads').then(response => {
                if (response.status === 200) {
                    var value = response.data;
                    // console.log(value);
                    updateError(value);

                    if (value[13] === "Success") {
                        swal({
                            title: "Success",
                            text: "Post is updated successfully!",
                            icon: "success",
                            button: "Ok",
                        }).then((value) => {
                            // isVerified(true);
                            //moving to the next page
                            updateRefresh(true);
                        });
                    }
                }
                else {
                    swal("Failed", "No internet connection!", "error");
                }
            });
            
        }

        if (refresh===true) {
            return <Redirect to="/" />
        }

        return (
            <>
                {/* {console.log(data)} */}
                <Header />
                <section className="main_section">
                    <div className="form_section">
                        <div className="form_title">
                            <h1>Upload Advertisement</h1>
                            <p>Fill up the form with your property information</p>
                        </div>
                        <form onSubmit={submitForm} id="main_form" encType="multipart/form-data">
                            <div className="summary">
                                <h2>Property Summary</h2>
                                <div>
                                    <h3>Property Name: </h3>
                                    <input type="text" name="PName" style={{ borderColor: errorMessage[0] }} onChange={inputEvent} placeholder='Enter Property Name' className="input1" required/>
                                </div>
                                <div>
                                    <h3>Property Type: </h3>
                                    <select className="Property_Type" name="PType" id="" onChange={inputEvent}>
                                        <option value="Hostel">Hostel</option>
                                        <option value="Family Home">Family Home</option>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Mess">Mess</option>
                                    </select>
                                </div>
                                <div>
                                    <h3>Select Division: </h3>
                                    <select className="Property_Type" name="division" id="" onChange={inputEvent} value={data.division}>
                                        {divisions.map((val, key) => printDivision(val, key))}
                                    </select>
                                </div>
                                <div>
                                    <h3>Select District: </h3>
                                    <select className="Property_Type" name="district" id="" onChange={inputEvent} value={data.district}>
                                        {districts.map((val, key) => printDistrict(val, key))}
                                    </select>
                                </div>
                                <div>
                                    <h3>Select Upazilla: </h3>
                                    <select className="Property_Type" name="upazilla" id="" onChange={inputEvent} value={data.upazilla}>
                                        {upazilla.map((val, key) => printUpazilla(val, key))}
                                    </select>
                                </div>
                                <div>
                                    <h3>Address: </h3>
                                    <textarea placeholder='Enter Address' name="address" style={{ borderColor: errorMessage[1] }} onChange={inputEvent} className="text_area" required/>
                                </div>
                            </div>


                            <div className="property_details">
                                <h2>Property Details</h2>

                                <div className="box_class">
                                    <div>
                                        <h3>Property Size: </h3>
                                        <input type="number" name="PSize" style={{ borderColor: errorMessage[2] }} onChange={inputEvent} placeholder='Size sqft' className="input2" required/>
                                    </div>
                                    <div>
                                        <h3>Bed Room: </h3>
                                        <select className="select2" onChange={inputEvent} name="BedRoom" id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="box_class">
                                    <div>
                                        <h3>Drawing Room: </h3>
                                        <select className="select2" onChange={inputEvent} name="DrawingRoom" id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3>Dining Room: </h3>
                                        <select className="select2" onChange={inputEvent} name="DiningRoom" id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Servant Room: </h3>
                                        <select className="select2" name="ServantRoom" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3>Kitchen: </h3>
                                        <select className="select2" name="Kitchen" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Attach Bath: </h3>
                                        <select className="select2" name="AttachBath" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3>Common Bath: </h3>
                                        <select className="select2" name="CommonBath" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Balcony: </h3>
                                        <select className="select2" name="Balcony" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3>Floor Level: </h3>
                                        <select className="select2" name="FloorLevel" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                            <option value="7">7</option>
                                            <option value="8">8</option>
                                            <option value="9">9</option>
                                            <option value="10">10</option>
                                            <option value="11">11</option>
                                            <option value="12">12</option>
                                            <option value="13">13</option>
                                            <option value="14">14</option>
                                            <option value="15">15</option>
                                            <option value="16">16</option>
                                            <option value="17">17</option>
                                            <option value="18">18</option>
                                            <option value="19">19</option>
                                            <option value="20">20</option>
                                            <option value="21">21</option>
                                            <option value="22">22</option>
                                            <option value="23">23</option>
                                            <option value="24">24</option>
                                            <option value="25">25</option>
                                            <option value="26">26</option>
                                            <option value="27">27</option>
                                            <option value="28">28</option>
                                            <option value="29">29</option>
                                            <option value="30">30</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="description">
                                    <h3>Description: </h3>
                                    <textarea placeholder='Write Description' onChange={inputEvent} name="Description" className="text_area" style={{ borderColor: errorMessage[3] }} required/>
                                </div>
                            </div>

                            <div className="facilities">
                                <h2>Facilities</h2>
                                <div className="box_class">
                                    <div>
                                        <h3>Gas Connection: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="GasConnection" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="GasConnection" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Generator: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Generator" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Generator" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Wasa Connection: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="WasaConnection" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="WasaConnection" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Lift: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Lift" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Lift" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>CCTV: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="CCTV" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="CCTV" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Parking: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Parking" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Parking" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Inter Com.: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="InterCom" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="InterCom" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Wi-Fi: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="WiFi" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="WiFi" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Security Alarm: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="SecurityAlarm" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="SecurityAlarm" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Cable TV: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="CableTV" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="CableTV" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Pool: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Pool" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Pool" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Gymnasiun: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Gymnasiun" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Gymnasiun" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Garden: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Garden" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Garden" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                    <div>
                                        <h3>Cleaning: </h3>
                                        <div>
                                            <input type="radio" onChange={inputEvent} name="Cleaning" value="1" />Yes
                                            <input type="radio" onChange={inputEvent} name="Cleaning" value="0" defaultChecked />No
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="financial">
                                <h2>Financial Details</h2>
                                <div className="box_class">
                                    <div>
                                        <h3>House Rent: </h3>
                                        <input type="number" onChange={inputEvent} name="HouseRent" placeholder='House Rent' className="input2" style={{ borderColor: errorMessage[4] }} required/>
                                    </div>
                                    <div>
                                        <h3>Gas Bill: </h3>
                                        <input type="number" onChange={inputEvent} name="GasBill" placeholder='Gas Bill' className="input2" style={{ borderColor: errorMessage[5] }} required/>
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Service Charge: </h3>
                                        <input type="number" onChange={inputEvent} name="ServiceCharge" placeholder='Service Charge' className="input2" style={{ borderColor: errorMessage[6] }} required/>
                                    </div>
                                    <div>
                                        <h3>Security Deposit: </h3>
                                        <input type="number" onChange={inputEvent} name="SecurityDeposit" placeholder='Security Deposit' className="input2" style={{ borderColor: errorMessage[7] }} required/>
                                    </div>
                                </div>
                            </div>

                            <div className="images">
                                <h2>Upload Images</h2>
                                <div className="box_class">
                                    <div>
                                        <h3>Image 1: </h3>
                                        <input type="File" className="input3" name='image1' onChange={fileEvent} accept="image/png, image/jpeg" style={{ border:'1px solid', borderColor: errorMessage[11] }} required/>

                                    </div>
                                    <div>
                                        <h3>Image 2: </h3>
                                        <input type="File" className="input3" name='image2' onChange={fileEvent} accept="image/png, image/jpeg" style={{ border:'1px solid', borderColor: errorMessage[12] }} required/>

                                    </div>
                                </div>
                            </div>

                            <div className="contact">
                                <h2>Owner Details</h2>
                                <div>
                                    <h3>Owner Name: </h3>
                                    <input type="text" onChange={inputEvent} name="OwnerName" placeholder='Enter Owner Name' className="input1" style={{ borderColor: errorMessage[8] }} required/>
                                </div>
                                <div>
                                    <h3>Email Address: </h3>
                                    <input type="email" onChange={inputEvent} name="EmailAddress" placeholder='Enter Owner Email' className="input1" style={{ borderColor: errorMessage[9] }} required/>
                                </div>
                                <div>
                                    <h3>Phone Number: </h3>
                                    <input type="number" onChange={inputEvent} name="PhoneNumber" placeholder='Enter Owner Phone' className="input1" style={{ borderColor: errorMessage[10] }} required/>
                                </div>
                            </div>
                            <div className="submit_btn">
                                <Button type="submit" variant="contained" style={{ fontWeight: "bold" }} color="success">
                                    Submit
                                </Button>
                            </div>
                        </form>
                    </div>
                </section>
                <Footer />

            </>
        );
    }
}

export default UploadAds;