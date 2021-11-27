import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import man from '../Images/man.png'
import '../StyleSheet/CostInfo.css';


export default function CostInfo(props) {
    var data=props.data;
    return (
        <div style={{ marginBottom: '20px' }}>
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ backgroundColor: '#077EB1', color: 'white', borderRadius: '5px' }}
                >
                    <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>Financial Details & Contact</Typography>
                </AccordionSummary>
                <AccordionDetails className='finCon'>
                    <div className="findetails">
                        <h2>Payment Info</h2>
                        <div>
                            <p><span><span className='round' style={{ backgroundColor: '#009D9A' }}></span>House Rent</span><span>{data.hrent}tk</span></p>
                            <p><span><span className='round' style={{ backgroundColor: '#DB7C00' }}></span>Gas Bill</span><span>{data.gbill}tk</span></p>
                            <p><span><span className='round' style={{ backgroundColor: '#5C76E8' }}></span>Service Charge</span><span>{data.scharge}tk</span></p>
                            <p><span><span className='round' style={{ backgroundColor: '#DD7099' }}></span>Security Deposit</span><span>{data.sdeposit}tk</span></p>
                        </div>
                    </div>

                    <div className="contdetails">
                        <h2>Contact Owner</h2>
                        <div className='cont_box'>
                            <div className='cont_box_det'>
                                <p><i className="fas fa-user-tie con_icon" style={{ fontSize:'25px',color: '#009D9A' }}></i>{data.oname}</p>
                                <p><i className="fas fa-envelope-open-text con_icon" style={{ fontSize:'25px',color: '#DB7C00' }}></i>{data.oemail}</p>
                                <p><i className="fas fa-phone con_icon" style={{ fontSize:'25px',color: '#5C76E8' }}></i>{data.phone}</p>
                            </div>
                            <div className='cont_box_img'>
                                <img src={man} alt="" style={{width:'100px',height:'100px',marginRight:'20px'}}/>
                            </div>
                        </div>
                    </div>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}
