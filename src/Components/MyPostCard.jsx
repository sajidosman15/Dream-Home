
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { Link } from "react-router-dom";
import Divider from '@mui/material/Divider';
import swal from 'sweetalert';
import axios from "axios";
import { useState, Component } from "react";
import { Redirect } from "react-router";



class Handeler extends Component {

    async deletePosts(data, path) {
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

const Card = (props) => {

    require('../StyleSheet/Card.css');

    var data = props.value;

    const [refresh, updateRefresh] = useState(null);

    var cardimg;
    try {
        cardimg = require('../Database/public/img/' + data.cimg);
    } catch (ex) {
        cardimg = require('../Database/public/img/deleted.png');
    }

    const deleteCard = (e) => {
        e.preventDefault();
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this post!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    try {
                        var worker = new Handeler();
                        worker.deletePosts(data.cid, 'deletepost').then(response => {
                            if (response.status === 200) {
                                var value = response.data;
                                swal("Your post has been deleted!", {
                                    icon: "success",
                                }).then((willDelete) => {
                                    updateRefresh(true);
                                });
                            }
                            else {
                                swal("Failed", "Something wrong. Try again later!", "error");
                            }
                        });

                    } catch (err) {
                        swal("Failed", "Something wrong. Try again later!", "error");
                    }

                } else {
                    // swal("Your imaginary file is safe!");
                }
            });

    }

    if (refresh === true) {
        return <Redirect to="/mypost" />
    }

    return (
        <>

            <div className="card">
                <Link to={`/Postdetails/${data.cid}`} style={{ textDecoration: 'none' }}>
                    <div className="Card_Image">
                        <img src={cardimg.default} alt="" />
                    </div>
                    <div className="Card_title">
                        <h3>{data.cname}</h3>
                        <p><LocationOnIcon /> {data.clocation}</p>
                        <h4>{data.cprice} tk / month</h4>
                    </div>
                </Link>
                <Divider />
                <div className='editclass'>
                    <Button onClick={deleteCard} variant="contained" style={{ backgroundColor: '#FF2B02' }} startIcon={<DeleteIcon style={{ color: 'white' }} />}>
                        Delete
                    </Button>
                    <Button variant="contained" style={{ backgroundColor: '#23CF5F' }} endIcon={<SendIcon style={{ color: 'white' }} />}>
                        <Link to={`/editpost/${data.cid}`} style={{textDecoration:'none',color:'white'}}>Update</Link>
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Card;