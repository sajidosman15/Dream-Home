
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Divider from '@mui/material/Divider';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Rating from './Rating';
import AirlineSeatIndividualSuiteIcon from '@mui/icons-material/AirlineSeatIndividualSuite';
import BathtubIcon from '@mui/icons-material/Bathtub';
import { Link } from "react-router-dom";

const getIcon = (value) => {
    if (value === 0) {
        return <ClearIcon className="cross" />;
    }
    else {
        return <CheckIcon className='ok' />;
    }
}

const Card = (props) => {

    require('../StyleSheet/Card.css');

    var data = props.value;

    var cardimg;
    try {
        cardimg = require('../Database/public/img/' + data.cimg);
    } catch (ex) {
        cardimg = require('../Database/public/img/noimage.png');
    }
    // const cardimg = require('../Database/public/img/124820-Screenshot (170).png');

    return (
        <>
            <div className="card" >
                <Link to={`/Postdetails/${data.cid}`} style={{ textDecoration: 'none' }}>
                    <div className="Card_Image">
                        <img src={cardimg.default} alt="" />
                    </div>
                    <div className="Card_title">
                        <h3>{data.cname}</h3>
                        <p><LocationOnIcon /> {data.clocation}</p>
                        <h4>{data.cprice} tk / month</h4>
                    </div>
                    <Divider />
                    <div className="card_Specification">
                        <div>
                            <p><AirlineSeatIndividualSuiteIcon style={{ marginRight: "4px" }} /> {data.cbed} Bed</p>
                            <p><BathtubIcon style={{ marginRight: "4px" }} />{data.cbath} Bath</p>
                            <p><i className="fa fa-arrows-alt" style={{ marginRight: "4px" }}></i>{data.sqft} sqft</p>
                            <p>{getIcon(data.cpool)} Pool</p>
                            <p>{getIcon(data.cnet)} Internet</p>
                            <p>{getIcon(data.cclean)} Cleaning</p>
                        </div>
                    </div>
                </Link>
                <Divider />
                <div className="Comment">
                    <div><Rating />{data.clike} Likes</div>
                    <p><i className="far fa-comment"></i> {data.ccomment} Comments</p>
                </div>
            </div>
        </>
    );
}

export default Card;