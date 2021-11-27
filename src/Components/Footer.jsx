import hostel from '../Images/hostel.png';
import home from '../Images/house.png';
import apartment from '../Images/apartment.png';
import mess from '../Images/mess.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import MailIcon from '@mui/icons-material/Mail';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import SendIcon from '@mui/icons-material/Send';
import { Link } from 'react-router-dom';

const Footer = () => {

    require('../StyleSheet/Footer.css');
    let division, district, upazila, type;
    return (
        <>
            <div className="cat_div" id="category">
                <div>
                    <h1 className="Cat_title">Explore Our Categories & Places</h1>
                </div>

                <div className="category">
                    <Link className='inner' to={`/searchredirect/${division}/${district}/${upazila}/Hostel/50000`}>
                        <img src={hostel} alt="" id="img" />
                        <h2 id="h2">Hostel</h2>
                    </Link>
                    <Link className='inner' to={`/searchredirect/${division}/${district}/${upazila}/Family Home/50000`}>
                        <img src={home} alt="" id="img" />
                        <h2 id="h2">Home</h2>
                    </Link>
                    <Link className='inner' to={`/searchredirect/${division}/${district}/${upazila}/Apartment/50000`}>
                        <img src={apartment} alt="" id="img" />
                        <h2 id="h2">Apartment</h2>
                    </Link>
                    <Link className='inner' to={`/searchredirect/${division}/${district}/${upazila}/Mess/50000`}>
                        <img src={mess} alt="" id="img" />
                        <h2 id="h2">Mess</h2>
                    </Link>
                </div>
            </div>

            <div className="footer_div">
                <div className="foot_des">
                    <div className="des_first">
                        <h2>DREAME<span className="h2_style">HOME</span></h2>
                        <p>Thank you to visit our site. We will guide you to find your dream home. Here you can search and find multiple home for rent in your area. You can also follow us in our social sites.</p>
                        <div id="social">
                            <a href="#"><TwitterIcon className="icons" /></a>
                            <a href="#"><FacebookIcon className="icons" /></a>
                            <a href="#"><InstagramIcon className="icons" /></a>
                            <a href="#"><PinterestIcon className="icons" /></a>
                            <a href="#"><LinkedInIcon className="icons" /></a>
                        </div>
                    </div>
                    <div id='contact' className="des_second">
                        <h2>CONTACT US</h2>
                        <p><LocationOnIcon style={{ fontSize: '17px' }} className="icons2" />3711-2880 Dhanmondi, Dhaka, Bangladesh</p>
                        <p><PhoneIcon style={{ fontSize: '17px' }} className="icons2" />(+88) 666 121 4321</p>
                        <p><MailIcon style={{ fontSize: '17px' }} className="icons2" />dreamhome@gmail.com</p>
                        <p><QueryBuilderIcon style={{ fontSize: '17px' }} className="icons2" />Mon - Sat, 08 AM - 06 PM</p>
                    </div>
                    <div className="des_third">
                        <h2>REPORT US</h2>
                        <p>If you see any issues in our website then let us know. Report us the issue.</p>
                        <form className="footer-newslatter-form">
                            <input type="text" placeholder="Enter Message"/>
                            <button><SendIcon/></button>
                        </form>
                    </div>
                </div>
                <div className="copyright">
                    <span className="border"></span>
                    <p>Copyright ©2021 All rights reserved | This website is made with <span>❤</span> by Sajid Osman</p>
                </div>
            </div>
        </>
    );
}

export default Footer;