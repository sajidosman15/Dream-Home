
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {Link} from "react-router-dom";

const Card=(props)=>{

    require('../StyleSheet/Card.css');

    var data=props.value;

    var cardimg;
    try {
        cardimg = require('../Database/public/img/' + data.cimg);
    } catch (ex) {
        cardimg = require('../Database/public/img/noimage.png');
    }


    return(
        <>
            <Link to={`/redirect/${data.cid}`} className="card" style={{width:'100%',textDecoration:'none'}}>
                <div className="Card_Image">
                    <img src={cardimg.default} alt=""/>
                </div>
                <div className="Card_title">
                    <h3>{data.cname}</h3>
                    <p><LocationOnIcon/> {data.clocation}</p>
                    <h4>{data.cprice} tk / month</h4>
                </div>
            </Link>
        </>
    );
}

export default Card;