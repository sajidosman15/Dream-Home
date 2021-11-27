import { Link } from "react-router-dom";
import { useState, useEffect, Component } from "react";
import axios from "axios";
import swal from 'sweetalert';
import { Redirect } from "react-router";


class Handeler extends Component {
    async submitData(formdata) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/registration`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                body: JSON.stringify(formdata),
            })
            status = response;
        } catch (err) {
            status = err.response;
        }

        return status;
    }

}

const Registration = () => {

    require('../StyleSheet/Registration.css');

    var data = {
        fname: '',
        lname: '',
        email: '',
        gender: '',
        district: '',
        phone: '',
        pass: '',
        cpass: ''
    }

    var dis = new Array();

    const [formData, updateData] = useState(data);
    const [errorMsg, setErrorMsg] = useState(dis);
    const [districts, setDistrict] = useState(dis);
    const [verified, isVerified] = useState(null);


    const inputHandeler = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        updateData((preValue) => {
            return ({
                ...preValue,
                [name]: value,
            });
        });
    }

    const printDistrict = (val, key) => {
        return (
            <option key={key} value={val.district}>{val.district}</option>
        );
    }

    const submitForm = (e) => {
        e.preventDefault();

        var worker = new Handeler();

        worker.submitData(formData).then(response => {
            if (response.status === 200) {
                var value = response.data;
                setErrorMsg(value);
                if (value[8] == "Success") {
                    swal({
                        title: "Success",
                        text: "Account is created successfully!",
                        icon: "success",
                        button: "Login",
                    }).then((value) => {
                        isVerified(true);
                    });
                }
            }
            else {
                swal("Failed", "Account creation failed", "error");
            }
        });
    }

    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step

        const fetchdistrict = async () => {
            try {
                const response = await axios.post(`http://localhost:8000/api/readdistrict`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": 'application/json',
                    },
                    cancelToken: ourRequest.token, // <-- 2nd step
                })
                setDistrict(response.data);
            } catch (err) {

            }
        }
        fetchdistrict()

        return () => {
            ourRequest.cancel() // <-- 3rd step
        }
    }, [])


    const nodec = {
        textDecoration: 'none',
        color: 'blue',
    }

    const errorstyle = {
        color: 'red',
        marginLeft: '2px',
        marginTop: '3px',
    }

    if (verified !== null) {
        return <Redirect to="/login" />
    }

    return (
        <div className="containe">
            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="form_box">

                <div className="body_form">
                    <div className="title_div">
                        <h1>Registration</h1>
                        <p>CREATE YOUR ACCOUNT</p>
                    </div>
                    <form onSubmit={submitForm}>
                        <div className="name_field">
                            <div>
                                <h3 className="field_heading">First Name</h3>
                                <input onChange={inputHandeler} placeholder='First Name' name='fname' className="input" />
                                <p style={errorstyle}>{errorMsg[0]}</p>
                            </div>
                            <div>
                                <h3 className="field_heading">Last Name</h3>
                                <input onChange={inputHandeler} placeholder='Last Name' name='lname' className="input" />
                                <p style={errorstyle}>{errorMsg[1]}</p>
                            </div>
                        </div>
                        <div className="email_field">
                            <h3 className="field_heading">Email</h3>
                            <input onChange={inputHandeler} type="email" placeholder='Enter Your Email' name='email' className="input" />
                            <p style={errorstyle}>{errorMsg[2]}</p>
                        </div>


                        <div className="gender_district">
                            <div className="gender_field">
                                <h3 className="field_heading">Gender</h3>
                                <div className="gender_options">
                                    <div>
                                        <input onChange={inputHandeler} type="radio" name="gender" value="Male" />
                                        <h3>Male</h3>
                                    </div>
                                    <div>
                                        <input onChange={inputHandeler} type="radio" name="gender" value="Female" />
                                        <h3>Female</h3>
                                    </div>
                                </div>
                                <p style={errorstyle}>{errorMsg[3]}</p>
                            </div>

                            <div className="district_field">
                                <h3 className="field_heading">Choose Your District</h3>
                                <select onChange={inputHandeler} className="district_selector" name="district" id="">
                                    <option value=""></option>
                                    {districts.map((val, key) => printDistrict(val, key))}
                                </select>

                                <p style={errorstyle}>{errorMsg[4]}</p>
                            </div>
                        </div>

                        <div className="phone_field">
                            <h3 className="field_heading">Mobile</h3>
                            <input onChange={inputHandeler} type="number" placeholder='Enter Mobile Number' name='phone' className="input" />
                            <p style={errorstyle}>{errorMsg[5]}</p>
                        </div>

                        <div className="name_field">
                            <div>
                                <h3 className="field_heading">Password</h3>
                                <input onChange={inputHandeler} type="password" placeholder='Enter Password' name='pass' className="input" />
                                <p style={errorstyle}>{errorMsg[6]}</p>
                            </div>
                            <div>
                                <h3 className="field_heading">Confirm Password</h3>
                                <input onChange={inputHandeler} type="password" placeholder='Confirm Password' name='cpass' className="input" />
                                <p style={errorstyle}>{errorMsg[7]}</p>
                            </div>
                        </div>

                        <div className="submission">
                            <button className="submit_button">Register Now</button>
                            <p>Already have an account? <Link to='/login' style={nodec}>Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default Registration;
