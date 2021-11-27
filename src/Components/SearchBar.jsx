import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState, Component, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import axios from "axios";
import { Link } from 'react-router-dom';


class Handeler extends Component {

  async fetchDynamic(data, path) {
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

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

const iOSBoxShadow =
  '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

var marks = [{ value: 0 }];

for (let i = 1000; i <= 50000; i += 5000) {
  marks.push({ value: i });
}


const PrettoSlider = styled(Slider)({
  color: '#52af77',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    boxShadow: iOSBoxShadow,
    '&:focus, &:hover, &.Mui-active': {
      boxShadow:
        '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        boxShadow: iOSBoxShadow,
      },
    },
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 40,
    height: 40,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#52af77',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },
    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
});

export default function SearchBar() {
  var values = {
    division: "",
    district: "",
    upazila: "",
    type: ""
  }

  const [data, setData] = useState(values);
  const [slidevalue, slideChanger] = useState(15000);

  var arr = new Array();
  const [districts, setDistrict] = useState(arr);
  const [divisions, setDivision] = useState(arr);
  const [upazilla, setUpazilla] = useState(arr);

  useEffect(() => {
    const ourRequest = axios.CancelToken.source() // <-- 1st step
    const fetchdivision = async () => {
      try {
        const response = await axios.post(`http://localhost:8000/api/readdivision`, {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Accept": 'application/json',
          },
          cancelToken: ourRequest.token, // <-- 2nd step
        })
        setDivision(response.data);

        var worker = new Handeler();
        worker.fetchDynamic(response.data[0].division, 'readdistrict2').then(response => {
          if (response.status === 200) {
            var valuedis = response.data;
            var district = valuedis[0].district;
            setDistrict(valuedis);

            worker.fetchDynamic(district, 'readupazilla').then(response => {
              if (response.status === 200) {
                var valuedis = response.data;
                setUpazilla(valuedis);
              }
              else {

              }
            });
          }
          else {

          }
        });

      } catch (err) {

      }
    }
    fetchdivision();

    return () => {
      ourRequest.cancel() // <-- 3rd step
    }
  }, [])


  const printDivision = (val, key) => {
    return (
      <MenuItem key={key} value={val.division}>{val.division}</MenuItem>
    );
  }
  const printDistrict = (val, key) => {
    return (
      <MenuItem key={key} value={val.district}>{val.district}</MenuItem>
    );
  }
  const printUpazilla = (val, key) => {
    return (
      <MenuItem key={key} value={val.upazilla}>{val.upazilla}</MenuItem>
    );
  }

  const changeEvent = (event) => {
    slideChanger(event.target.value);
  }

  const handleChange = (event) => {

    var name = event.target.name;
    var value = event.target.value;

    if (name === 'division') {
      if (value === '') {
        value = divisions[0].division;
      }
      var worker = new Handeler();
      worker.fetchDynamic(value, 'readdistrict2').then(response => {
        if (response.status === 200) {
          var valuedis = response.data;
          var district = valuedis[0].district;
          setDistrict(valuedis);
          setData((preValue) => {
            return ({
              ...preValue,
              ['district']: '',
            });
          });

          worker.fetchDynamic(district, 'readupazilla').then(response => {
            if (response.status === 200) {
              var valuedis = response.data;
              setUpazilla(valuedis);
              setData((preValue) => {
                return ({
                  ...preValue,
                  ['upazila']: '',
                });
              });
            }
            else {

            }
          });
        }
        else {

        }
      });
    }

    if (name === 'district') {
      if (value === '') {
        value = districts[0].district;
      }
      var worker = new Handeler();
      worker.fetchDynamic(value, 'readupazilla').then(response => {
        if (response.status === 200) {
          var valuedis = response.data;
          setUpazilla(valuedis);
          setData((preValue) => {
            return ({
              ...preValue,
              ['upazila']: '',
            });
          });
        }
        else {

        }
      });
    }

    setData((data) => {
      return {
        ...data,
        [event.target.name]: event.target.value,
      };

    });

  };

  let division, district, upazila, type;
  if(data.division!==""){
    division=data.division;
  }
  if(data.district!==""){
    district=data.district;
  }
  if(data.upazila!==""){
    upazila=data.upazila;
  }
  if(data.type!==""){
    type=data.type;
  }

  return (
    <>
      {/* {console.log(slidevalue)} */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel >Choose Division</InputLabel>
          <Select
            value={data.division}
            name="division"
            onChange={handleChange}
            className="input_field"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {divisions.map((val, key) => printDivision(val, key))}
          </Select>
        </FormControl>


        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Choose District</InputLabel>
          <Select
            value={data.district}
            name="district"
            className="input_field"
            onChange={handleChange}
          //   renderValue={(value) => `⚠️  - ${value}`}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {districts.map((val, key) => printDistrict(val, key))}
          </Select>
        </FormControl>


        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Choose Upazila</InputLabel>
          <Select
            value={data.upazila}
            name="upazila"
            className="input_field"
            onChange={handleChange}
          //   inputProps={{ readOnly: true }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {upazilla.map((val, key) => printUpazilla(val, key))}
          </Select>
        </FormControl>


        <FormControl sx={{ m: 1, minWidth: 200 }}>
          <InputLabel>Home Type</InputLabel>
          <Select
            value={data.type}
            name="type"
            className="input_field"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={'Hostel'}>Hostel</MenuItem>
            <MenuItem value={'Family Home'}>Family Home</MenuItem>
            <MenuItem value={'Apartment'}>Apartment</MenuItem>
            <MenuItem value={'Mess'}>Mess</MenuItem>
          </Select>
        </FormControl>

      </div>

      <div className="second_div">
        <Box className="slider_box">
          <Box sx={{ m: 3 }} />
          <Typography gutterBottom>Price Range:</Typography>
          <PrettoSlider onChange={changeEvent}
            valueLabelDisplay="on"
            aria-label="pretto slider"
            marks={marks}
            defaultValue={15000}
            max={50000}
            min={500}
            step={500}
          />
        </Box>
        <Link to={`/searchredirect/${division}/${district}/${upazila}/${type}/${slidevalue}`} className="submitButton">Search Propertie <ArrowRightAltIcon id="arrow" /></Link>
      </div>
    </>
  );
}
