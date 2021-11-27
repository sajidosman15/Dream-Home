import logo from '../Images/logo.png';
import Loader from "react-loader-spinner";
import AccountMenu from './AccountMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome,faSearchLocation,faList,faPhone } from '@fortawesome/free-solid-svg-icons';
import NavMenu from './NavMenu';
import {Link} from "react-router-dom";

const NavigationBar=()=>{
    require('../StyleSheet/NavigationBar.css');
    return(
        <>
            <section className='nav_container'>
                <div>
                    <span>{<Loader type="Puff" color="#D85B5B" height={25} width={25} />}</span>
                    <h1><i className="fab fa-dochub"></i>ream <i className="fab fa-houzz"></i>ome</h1>
                    <img className="logo" src={logo} alt=""/>
                </div>
                <ul className="nav_items">
                    <li><Link to='/'><FontAwesomeIcon className="icon" icon={faHome}/><span className="hidden_name">Home</span></Link></li>
                    <li><a href="#search"><FontAwesomeIcon className="icon" icon={faSearchLocation}/><span className="hidden_name">Search</span></a></li>
                    <li><a href="#category"><FontAwesomeIcon className="icon" icon={faList}/><span className="hidden_name">Category</span></a></li>
                    <li><a href="#contact"><FontAwesomeIcon className="icon" icon={faPhone}/><span className="hidden_name">Contact</span></a></li>
                </ul>
                <AccountMenu/>
                <NavMenu/>
            </section>
        </>
    );
}

export default NavigationBar;