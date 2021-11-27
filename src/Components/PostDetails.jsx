import Header from "./Header";
import Footer from "./Footer";
import Rating from '@mui/material/Rating';
import DehazeIcon from '@mui/icons-material/Dehaze';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ApiIcon from '@mui/icons-material/Api';
import PersonIcon from '@mui/icons-material/Person';
import PropertyTable from './PropertyTable';
import ImageSlider from './ImageSlider';
import Accordion from './Accordion';
import Facilities from './Facilities';
import CostInfo from './CostInfo';
import GoogleMap from './GoogleMap';
import SimilarPost from './SimilarPost';
import { useParams } from 'react-router-dom';
import { Redirect } from "react-router";
import { useState, Component, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";


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

}



function PostDetails() {

    require('../StyleSheet/PostDetails.css');

    const { id } = useParams();
    const [postDetails, updatePostDetails] = useState(null);
    const [notfound, setNotFound] = useState(null);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step

        try {
            var worker = new Handeler();
            worker.fetchPosts(id).then(response => {
                if (response.status === 200) {
                    var value = response.data;

                    if (Object.keys(value).length === 0) {
                        setNotFound(true);
                    } else {
                        updatePostDetails(value);
                    }

                }
                else {
                    swal("Failed", "No internet connection!", "error");
                }
            });

        } catch (err) {
            swal("Failed", "No internet connection!", "error");
        }

        return () => {
            ourRequest.cancel() // <-- 3rd step
        }
    }, [])

    if (notfound === true) {
        return <Redirect to='/error' />;
    }

    if (postDetails !== null) {
        var pictures = {
            pic1: postDetails.image1,
            pic2: postDetails.image2,
        }

        var propertyDetails = {
            PropertySize: postDetails.PSize,
            BedRoom: postDetails.BedRoom,
            DrawingRoom: postDetails.DrawingRoom,
            DiningRoom: postDetails.DiningRoom,
            ServantRoom: postDetails.ServantRoom,
            Kitchen: postDetails.Kitchen,
            AttachBath: postDetails.AttachBath,
            CommonBath: postDetails.CommonBath,
            Balcony: postDetails.Balcony,
            FloorLevel: postDetails.FloorLevel,
        }

        var facilities = {
            Gas: postDetails.GasConnection,
            Wasa: postDetails.WasaConnection,
            CCTV: postDetails.CCTV,
            Inter: postDetails.InterCom,
            Alarm: postDetails.SecurityAlarm,
            Pool: postDetails.Pool,
            Garden: postDetails.Garden,
            Generator: postDetails.Generator,
            Lift: postDetails.Lift,
            Parking: postDetails.Parking,
            WiFi: postDetails.WiFi,
            Cable: postDetails.CableTV,
            Gymnasiun: postDetails.Gymnasiun,
            Cleaning: postDetails.Cleaning,
        }

        var paymentContact = {
            hrent: postDetails.HouseRent,
            gbill: postDetails.GasBill,
            scharge: postDetails.ServiceCharge,
            sdeposit: postDetails.SecurityDeposit,
            oname: postDetails.OwnerName,
            oemail: postDetails.EmailAddress,
            phone: postDetails.PhoneNumber,
        }

        return (
            <>
                <Header />
                <section className="details_container">
                    <div className="details_body">
                        <div className="prop_title">
                            <h1>{postDetails.PName}</h1>
                            <p>{postDetails.address} / {postDetails.upazilla} / {postDetails.district} / {postDetails.division}</p>
                            <div className="rating">
                                <Rating name="disabled" value={5} readOnly style={{ fontSize: '18px', color: '#427B01' }} />
                                <p>5.0</p>
                                <p style={{ color: '#077eb1', fontWeight: 'bold' }}> ( 0 comments )</p>
                            </div>
                        </div>

                        <div className="overview" id='overview'>
                            <div className="overview_nav">
                                <ul>
                                    <li><a href="#overview" style={{
                                        color: 'white',
                                        backgroundColor: '#077eb1'
                                    }}><DehazeIcon style={{ marginRight: '3px' }} />Overview</a></li>
                                    <li><a href="#photo"><PhotoCameraIcon style={{ marginRight: '3px' }} />Photo</a></li>
                                    <li><a href="#facilities"><ApiIcon style={{ marginRight: '3px' }} />Facilities</a></li>
                                    <li><a href="#contact"><PersonIcon style={{ marginRight: '3px' }} />Contact</a></li>
                                </ul>
                            </div>

                            <div className="overview_box">
                                <div className="images_box" id='photo'>
                                    <ImageSlider pic={pictures} />
                                </div>

                                <div className="property_details_box">
                                    <PropertyTable className="propTable" data={propertyDetails} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <Accordion text={postDetails.Description} />
                        </div>

                        <div>
                            <span id='facilities'></span>
                            <Facilities val={facilities} />
                        </div>

                        <div>
                            <span id='contact'></span>
                            <CostInfo data={paymentContact} />
                        </div>

                        <div className="map">
                            <GoogleMap add="Dhaka" />
                        </div>
                    </div>

                </section>
                <SimilarPost />
                <Footer />

            </>
        );
    }
    else {
        return (
            <>
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Loader
                        type="Plane"
                        color="#00BFFF"
                        height={120}
                        width={120}
                        timeout={10000} //3 secs
                    />
                </div>
            </>
        );
    }

}



export default PostDetails;