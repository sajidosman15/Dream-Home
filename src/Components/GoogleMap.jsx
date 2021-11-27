import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export class MapContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            address: '',
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            mapCenter: {
                lat: 23.777176,
                lng: 90.399452
            }
        };
    }


    render() {

        var error = 1;
        try {
            geocodeByAddress('Dhaka')
                .then(results => getLatLng(results[0]))
                .then(latLng => {
                    this.setState({ address: this.props.add });
                    this.setState({ mapCenter: latLng });
                })
                .catch(error => console.error('Error', error));
            error = 0;
        } catch (ex) {
            error = 1;
        }

        if (error === 0) {
            return (

                <div style={{ marginBottom: '20px' }}>
                    <Accordion defaultExpanded>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            style={{ backgroundColor: '#077EB1', color: 'white', borderRadius: '5px' }}
                        >
                            <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>Map</Typography>
                        </AccordionSummary>
                        <AccordionDetails className='finCon'>
                            <Map google={this.props.google}
                                initialCenter={{
                                    lat: this.state.mapCenter.lat,
                                    lng: this.state.mapCenter.lng
                                }}
                                center={{
                                    lat: this.state.mapCenter.lat,
                                    lng: this.state.mapCenter.lng
                                }}
                                style={{ height: '300px', width: '100%' }}>
                                <Marker
                                    position={{
                                        lat: this.state.mapCenter.lat,
                                        lng: this.state.mapCenter.lng
                                    }} />

                            </Map>
                        </AccordionDetails>
                    </Accordion>

                </div>

            )
        } else {
            return (
                <>

                    <div style={{ marginBottom: '20px' }}>
                        <Accordion defaultExpanded>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ backgroundColor: '#077EB1', color: 'white', borderRadius: '5px' }}
                            >
                                <Typography style={{ fontWeight: 'bold', fontSize: '18px' }}>Map</Typography>
                            </AccordionSummary>
                            <AccordionDetails className='finCon'>
                                <div style={{ width: '100%', height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Loader
                                        type="ThreeDots"
                                        color="#00BFFF"
                                        height={120}
                                        width={120}
                                    // timeout={30000} //3 secs
                                    />
                                </div>
                            </AccordionDetails>
                        </Accordion>

                    </div>

                </>
            );
        }
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyDZSNsized0LLv3M2CwVjj_sF1MJ4Xsrpw')
})(MapContainer)
