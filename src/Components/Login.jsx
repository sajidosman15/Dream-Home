

import { Link } from 'react-router-dom';
import { useState, Component } from "react";
import axios from "axios";
import { Redirect } from "react-router";

class Handeler extends Component {
    async submitData(formdata) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },
                email: JSON.stringify(formdata.email),
                pass: JSON.stringify(formdata.password),

            })
            status = response;
        } catch (err) {
            status = err.response;
        }

        return status;
    }

}

const Login = () => {
    // require('bootstrap/dist/css/bootstrap.min.css');
    require('../StyleSheet/Login.css');


    var data = {
        email: '',
        password: '',
    }
    const errorstyle = {
        color: 'red',
        marginLeft: '2px',
        marginTop: '3px',
    }

    const [formData, updateData] = useState(data);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);
    const [failed, setFailed] = useState(null);
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

    const submitForm = (e) => {
        e.preventDefault();

        var worker = new Handeler();
        worker.submitData(formData).then(response => {
            if (response.status === 200) {
                var value = response.data;
                setError1(value[0]);
                setError2(value[1]);
                if (value[2] !== "Fail") {
                    setFailed("");
                    localStorage.setItem("token", value[2]);
                    isVerified(true);
                }
                else {
                    setFailed("Email or Password is incorrect!");
                }
            }
            else {
                //log in failed
                setFailed("Check your internet connection!");
            }
        });

    }

    const token = localStorage.getItem('token');

    if (verified !== null || token !== null) {
        return <Redirect to="/" />
    }

    return (
        <div className="container">

            <div className="bg"></div>
            <div className="bg bg2"></div>
            <div className="bg bg3"></div>
            <div className="form-box">
                <div className="header-form">
                    <h4 className="head_logo"><i className="fa fa-user-circle" style={{ fontSize: "110px", color: 'white' }}></i></h4>
                </div>

                <div className="body-form">
                    <form onSubmit={submitForm}>
                        <div className="input_group">
                            <div>
                                <span><i className="fa fa-user"></i></span>
                            </div>
                            <input type="text" onChange={inputHandeler} name="email" className="form-control" placeholder="Email" />
                            <p style={errorstyle}>{error1}</p>
                        </div>
                        <div className="input_group">
                            <div>
                                <span><i className="fa fa-lock"></i></span>
                            </div>
                            <input type="password" name="password" onChange={inputHandeler} className="form-control" placeholder="Password" />
                            <p style={errorstyle}>{error2}</p>
                        </div>

                        <h4 style={{ color: 'red', textAlign: 'center' }}>{failed}</h4>

                        <button type="submit" className="button">LOGIN</button>
                        <div className="message">
                            <div style={{ color: 'white' }}><input type="checkbox" /> Remember Me</div>
                            <div><Link to='/registration' style={{ color: 'white' }}>Create Account</Link></div>
                        </div>
                    </form>
                    <div className="social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter-square"></i></a>
                        <a href="#"><i className="fab fa-google"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
