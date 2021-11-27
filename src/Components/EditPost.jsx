import Header from "./Header";
import Footer from "./Footer";
import Button from '@mui/material/Button';
import { useState, Component, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router";
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';


class Handeler extends Component {

    async fetchPosts(data) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/fetchpostsall`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                id: JSON.stringify(data),

            })
            status = response;

        } catch (err) {
            status = err.response;
        }

        return status;
    }

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

function EditPost() {

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
    }

    const { id } = useParams();

    var arr = new Array();
    const [data, updateData] = useState(rowData);
    const [errorMessage, updateError] = useState(arr);
    const [districts, setDistrict] = useState(arr);
    const [divisions, setDivision] = useState(arr);
    const [upazilla, setUpazilla] = useState(arr);
    const [refresh, updateRefresh] = useState(null);
    const [notfound, setNotFound] = useState(null);
    const [state, setState] = useState(true);


    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step
        var oldDivision, oldDistrict;
        try {
            var worker = new Handeler();
            worker.fetchPosts(id).then(response => {
                if (response.status === 200) {
                    var value = response.data;

                    if (Object.keys(value).length === 0) {
                        setNotFound(true);
                    } else {
                        updateData(value);
                        oldDivision = value.division;
                        oldDistrict = value.district;
                        fetchdivision();
                    }

                }
                else {
                    swal("Failed", "No internet connection!", "error");
                }
            });

        } catch (err) {
            swal("Failed", "No internet connection!", "error");
        }

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

                var worker = new Handeler();
                worker.fetchDynamic(oldDivision, 'readdistrict2').then(response => {
                    if (response.status === 200) {
                        var valuedis = response.data;
                        var district = oldDistrict;
                        setDistrict(valuedis);

                        worker.fetchDynamic(district, 'readupazilla').then(response => {
                            if (response.status === 200) {
                                var valuedis = response.data;
                                setUpazilla(valuedis);
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

        return () => {
            ourRequest.cancel() // <-- 3rd step
        }
    }, [])

    if (notfound === true) {
        return <Redirect to='/error' />;
    }

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
            formdata.append('id', id);
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
            worker.submitData(formdata, 'updates').then(response => {
                if (response.status === 200) {
                    var value = response.data;
                    // console.log(value);
                    updateError(value);

                    if (value[11] === "Success") {
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

        const printFacilities = (val, names) => {
            if (val === 1) {
                return (
                    <div>
                        <input type="radio" onClick={(e) => inputEvent(e)} name={names} value="1" defaultChecked />Yes
                        <input type="radio" onClick={(e) => inputEvent(e)} name={names} value="0" />No
                    </div>
                );
            }
            else {
                return (
                    <div>
                        <input type="radio" onClick={(e) => inputEvent(e)} name={names} value="1" />Yes
                        <input type="radio" onClick={(e) => inputEvent(e)} name={names} value="0" defaultChecked />No
                    </div>
                );
            }
        }

        if (refresh === true) {
            return <Redirect to={`/Postdetails/${id}`} />
        }


        return (
            <>
                {/* {console.log(data)} */}
                <Header />
                <section className="main_section">
                    <div className="form_section">
                        <div className="form_title">
                            <h1>Update Advertisement</h1>
                            <p>Fill up the form with your property information</p>
                        </div>
                        <form onSubmit={submitForm} id="main_form" encType="multipart/form-data">
                            <div className="summary">
                                <h2>Property Summary</h2>
                                <div>
                                    <h3>Property Name: </h3>
                                    <input value={data.PName} type="text" name="PName" style={{ borderColor: errorMessage[0] }} onChange={inputEvent} placeholder='Enter Property Name' className="input1" required />
                                </div>
                                <div>
                                    <h3>Property Type: </h3>
                                    <select value={data.PType} className="Property_Type" name="PType" id="" onChange={inputEvent}>
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
                                    <textarea value={data.address} placeholder='Enter Address' name="address" style={{ borderColor: errorMessage[1] }} onChange={inputEvent} className="text_area" required />
                                </div>
                            </div>


                            <div className="property_details">
                                <h2>Property Details</h2>

                                <div className="box_class">
                                    <div>
                                        <h3>Property Size: </h3>
                                        <input value={data.PSize} type="number" name="PSize" style={{ borderColor: errorMessage[2] }} onChange={inputEvent} placeholder='Size sqft' className="input2" required />
                                    </div>
                                    <div>
                                        <h3>Bed Room: </h3>
                                        <select value={data.BedRoom} className="select2" onChange={inputEvent} name="BedRoom" id="">
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
                                        <select value={data.DrawingRoom} className="select2" onChange={inputEvent} name="DrawingRoom" id="">
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
                                        <select value={data.DiningRoom} className="select2" onChange={inputEvent} name="DiningRoom" id="">
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
                                        <select value={data.ServantRoom} className="select2" name="ServantRoom" onChange={inputEvent} id="">
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                        </select>
                                    </div>
                                    <div>
                                        <h3>Kitchen: </h3>
                                        <select value={data.Kitchen} className="select2" name="Kitchen" onChange={inputEvent} id="">
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
                                        <select value={data.AttachBath} className="select2" name="AttachBath" onChange={inputEvent} id="">
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
                                        <select value={data.CommonBath} className="select2" name="CommonBath" onChange={inputEvent} id="">
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
                                        <select value={data.Balcony} className="select2" name="Balcony" onChange={inputEvent} id="">
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
                                        <select value={data.FloorLevel} className="select2" name="FloorLevel" onChange={inputEvent} id="">
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
                                    <textarea value={data.Description} placeholder='Write Description' onChange={inputEvent} name="Description" className="text_area" style={{ borderColor: errorMessage[3] }} required />
                                </div>
                            </div>

                            <div className="facilities">
                                <h2>Facilities</h2>
                                <div className="box_class">
                                    <div>
                                        <h3>Gas Connection: </h3>
                                        {printFacilities(data.GasConnection, 'GasConnection')}
                                    </div>
                                    <div>
                                        <h3>Generator: </h3>
                                        {printFacilities(data.Generator, 'Generator')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Wasa Connection: </h3>
                                        {printFacilities(data.WasaConnection, 'WasaConnection')}

                                    </div>
                                    <div>
                                        <h3>Lift: </h3>
                                        {printFacilities(data.Lift, 'Lift')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>CCTV: </h3>
                                        {printFacilities(data.CCTV, 'CCTV')}

                                    </div>
                                    <div>
                                        <h3>Parking: </h3>
                                        {printFacilities(data.Parking, 'Parking')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Inter Com.: </h3>
                                        {printFacilities(data.InterCom, 'InterCom')}

                                    </div>
                                    <div>
                                        <h3>Wi-Fi: </h3>
                                        {printFacilities(data.WiFi, 'WiFi')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Security Alarm: </h3>
                                        {printFacilities(data.SecurityAlarm, 'SecurityAlarm')}

                                    </div>
                                    <div>
                                        <h3>Cable TV: </h3>
                                        {printFacilities(data.CableTV, 'CableTV')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Pool: </h3>
                                        {printFacilities(data.Pool, 'Pool')}

                                    </div>
                                    <div>
                                        <h3>Gymnasiun: </h3>
                                        {printFacilities(data.Gymnasiun, 'Gymnasiun')}

                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Garden: </h3>
                                        {printFacilities(data.Garden, 'Garden')}

                                    </div>
                                    <div>
                                        <h3>Cleaning: </h3>
                                        {printFacilities(data.Cleaning, 'Cleaning')}

                                    </div>
                                </div>
                            </div>

                            <div className="financial">
                                <h2>Financial Details</h2>
                                <div className="box_class">
                                    <div>
                                        <h3>House Rent: </h3>
                                        <input value={data.HouseRent} type="number" onChange={inputEvent} name="HouseRent" placeholder='House Rent' className="input2" style={{ borderColor: errorMessage[4] }} required />
                                    </div>
                                    <div>
                                        <h3>Gas Bill: </h3>
                                        <input value={data.GasBill} type="number" onChange={inputEvent} name="GasBill" placeholder='Gas Bill' className="input2" style={{ borderColor: errorMessage[5] }} required />
                                    </div>
                                </div>
                                <div className="box_class">
                                    <div>
                                        <h3>Service Charge: </h3>
                                        <input value={data.ServiceCharge} type="number" onChange={inputEvent} name="ServiceCharge" placeholder='Service Charge' className="input2" style={{ borderColor: errorMessage[6] }} required />
                                    </div>
                                    <div>
                                        <h3>Security Deposit: </h3>
                                        <input value={data.SecurityDeposit} type="number" onChange={inputEvent} name="SecurityDeposit" placeholder='Security Deposit' className="input2" style={{ borderColor: errorMessage[7] }} required />
                                    </div>
                                </div>
                            </div>


                            <div className="contact">
                                <h2>Owner Details</h2>
                                <div>
                                    <h3>Owner Name: </h3>
                                    <input value={data.OwnerName} type="text" onChange={inputEvent} name="OwnerName" placeholder='Enter Owner Name' className="input1" style={{ borderColor: errorMessage[8] }} required />
                                </div>
                                <div>
                                    <h3>Email Address: </h3>
                                    <input value={data.EmailAddress} type="email" onChange={inputEvent} name="EmailAddress" placeholder='Enter Owner Email' className="input1" style={{ borderColor: errorMessage[9] }} required />
                                </div>
                                <div>
                                    <h3>Phone Number: </h3>
                                    <input value={data.PhoneNumber} type="number" onChange={inputEvent} name="PhoneNumber" placeholder='Enter Owner Phone' className="input1" style={{ borderColor: errorMessage[10] }} required />
                                </div>
                            </div>
                            <div className="submit_btn">
                                <Button type="submit" variant="contained" style={{ fontWeight: "bold" }} color="success">
                                    Update
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

export default EditPost;