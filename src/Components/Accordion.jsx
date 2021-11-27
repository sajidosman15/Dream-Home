import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion(props) {
  return (
    <div style={{marginBottom:'20px'}}>
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
          style={{backgroundColor:'#077EB1',color:'white',borderRadius:'5px'}}
        >
          <Typography style={{fontWeight:'bold',fontSize:'18px'}}>Description</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{textAlign:'justify'}}>
            {props.text}
          </Typography>
        </AccordionDetails>
      </Accordion>

    </div>
  );
}
