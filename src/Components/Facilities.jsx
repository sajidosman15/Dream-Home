import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StrikeText from './StrikeText';
import '../StyleSheet/Facilities.css';
import gas from '../Images/gasleak.png';
import drop from '../Images/drop.png';
import cctv from '../Images/cctv.png';
import lan from '../Images/lan.png';
import alarm from '../Images/alarm.png';
import pool from '../Images/pool.png';
import garden from '../Images/park.png';
import generator from '../Images/generator.png';
import lift from '../Images/elevator.png';
import parking from '../Images/parking.png';
import wifi from '../Images/wifi.png';
import cable from '../Images/coaxial.png';
import gym from '../Images/gym.png';
import cleaning from '../Images/mop.png';

export default function SimpleAccordion(props) {

    var val=props.val;

    return (
        <div style={{ marginBottom: '20px' }}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#077EB1', color: 'white', borderRadius: '5px' }}
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>What this place offers</Typography>
                </AccordionSummary>
                <AccordionDetails className='fac_box'>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={gas} alt="" className='pnglogo' /><StrikeText val={val.Gas} text='Gas Connection' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={drop} alt="" className='pnglogo' /><StrikeText val={val.Wasa} text='Wasa Connection' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={cctv} alt="" className='pnglogo' /><StrikeText val={val.CCTV} text='CCTV' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={lan} alt="" className='pnglogo' /><StrikeText val={val.Inter} text='Inter Communication' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={alarm} alt="" className='pnglogo' /><StrikeText val={val.Alarm} text='Security Alarm' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={pool} alt="" className='pnglogo' /><StrikeText val={val.Pool} text='Pool' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={garden} alt="" className='pnglogo' /><StrikeText val={val.Garden} text='Garden' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={generator} alt="" className='pnglogo' /><StrikeText val={val.Generator} text='Generator' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={lift} alt="" className='pnglogo' /><StrikeText val={val.Lift} text='Lift' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={parking} alt="" className='pnglogo' /><StrikeText val={val.Parking} text='Parking' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={wifi} alt="" className='pnglogo' /><StrikeText val={val.WiFi} text='Wi-Fi' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={cable} alt="" className='pnglogo' /><StrikeText val={val.Cable} text='Cable TV' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={gym} alt="" className='pnglogo' /><StrikeText val={val.Gymnasiun} text='Gymnasiun' />
                    </Typography>
                    <Typography className="items" style={{ margin: '7px 0px' }}>
                        <img src={cleaning} alt="" className='pnglogo' /><StrikeText val={val.Cleaning} text='Cleaning' />
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
