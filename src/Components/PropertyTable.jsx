import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, value) {
  return { name, value };
}


export default function PropertyTable(props) {
    var data=props.data;

    const getOutput=(val)=>{
        if(val===0){
            return <ClearIcon style={{color:'red',fontSize:'20px'}} className="cross"/>;
        }
        else if(val===1){
            return <CheckIcon style={{color:'green',fontSize:'20px'}} className='ok'/>;
        }
        else{
            return val;
        }
    }

    const rows = [
        createData('Property Size', data.PropertySize + ' Sqft'),
        createData('Bed Room', data.BedRoom),
        createData('Drawing Room', getOutput(data.DrawingRoom)),
        createData('Dining Room', getOutput(data.DiningRoom)),
        createData('Servant Room', getOutput(data.ServantRoom)),
        createData('Kitchen', getOutput(data.Kitchen)),
        createData('Attach Bath', data.AttachBath),
        createData('Common Bath', data.CommonBath),
        createData('Balcony', data.Balcony),
        createData('Floor Level', data.FloorLevel),
      ];

  return (
    <TableContainer component={Paper}>
      <Table  aria-label="customized table">
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row" style={{padding:'5px 16px'}}>
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="right" style={{padding:'5px 16px'}}>{row.value}</StyledTableCell>
            </StyledTableRow> 
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
