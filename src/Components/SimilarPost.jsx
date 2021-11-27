
import Carousel from 'react-elastic-carousel';
import Item from "./Item";
import Card from "./SimilarCard";
import { useState, Component, useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert';


class Handeler extends Component {

    async fetchPosts(path) {
        var status;
        try {
            const response = await axios.post(`http://localhost:8000/api/${path}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": 'application/json',
                },

            })
            status = response;

        } catch (err) {
            status = err.response;
        }

        return status;
    }

}



const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 500, itemsToShow: 2 },
    { width: 900, itemsToShow: 3 },
    { width: 1300, itemsToShow: 4 },
];

function SimilarPost() {

    var arr = new Array();
    const [allPost, updateAllPost] = useState(arr);

    useEffect(() => {
        const ourRequest = axios.CancelToken.source() // <-- 1st step

        try {
            var worker = new Handeler();
            worker.fetchPosts('fetchpostslimit').then(response => {
                if (response.status === 200) {
                    var value = response.data;
                    updateAllPost(value);
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

    const app = {

        fontFamily: 'sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // height: '100vh',

    }

    const Cat_title = {
        textAlign: 'center',
        margin: '1.5% 0%',
        fontFamily: 'Poppins',
        fontSize: '35px',
        color: '#091540'
    }

    const printPosts = (val, key) => {
        var cardData = {
            cid: val['id'],
            cimg: val['image1'],
            cname: val['PName'],
            clocation: val['address'],
            cprice: val['HouseRent'],
        };
        return (
            <Item key={key}><Card value={cardData} /></Item>
        );
    }

    return (
        <>
            <h1 style={Cat_title}>Similar Properties</h1>
            <div style={app}>
                <Carousel breakPoints={breakPoints}>
                    {allPost.map((val, key) => printPosts(val, key))}
                </Carousel>
            </div>
        </>
    );
}

export default SimilarPost;