import Header from "./Header";
import Card from "./MyPostCard";
import Footer from "./Footer";
import { useState, Component, useEffect } from "react";
import { Redirect } from "react-router";
import axios from "axios";
import swal from 'sweetalert';
import error from '../Images/norecord.gif';
import '../StyleSheet/MyPost.css';


class Handeler extends Component {

    async fetchPosts(data, path) {
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

}

function MyPost() {

    require('../StyleSheet/HomePage.css');

    var arr = new Array();
    const [allPost, updateAllPost] = useState(arr);
    const [notfound, setNotFound] = useState(null);
    var token = 0;

    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step

        try {
            var worker = new Handeler();
            worker.fetchPosts(token, 'fetchmyposts').then(response => {
                if (response.status === 200) {
                    var value = response.data;
                    if (Object.keys(value).length === 0) {
                        setNotFound(true);
                    } else {
                        updateAllPost(value);
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

    token = localStorage.getItem('token');
    if (token === null) {
        return <Redirect to="/login" />
    } else {

        if (notfound === true) {
            return (
                <>
                    <Header />

                    <section className="body_section">
                        <div className="body_title">
                            <h1>My Advertisements</h1>
                        </div>
                        <div className='classdesign'>
                            <img className='imageStyle' src={error} alt="No Record Found" />
                        </div>
                    </section>

                    <Footer />

                </>
            );
        }
        else {
            const printPosts = (val, key) => {
                var cardData = {
                    cid: val['id'],
                    cimg: val['image1'],
                    cname: val['PName'],
                    clocation: val['address'],
                    cprice: val['HouseRent'],
                };
                return (
                    <Card key={key} value={cardData} />
                );
            }

            return (
                <>
                    <Header />

                    <section className="body_section">
                        <div className="body_title">
                            <h1>My Advertisements</h1>
                        </div>
                        <div className="card_section">
                            {allPost.map((val, key) => printPosts(val, key))}
                        </div>
                    </section>

                    <Footer />

                </>
            );
        }


    }

}

export default MyPost;