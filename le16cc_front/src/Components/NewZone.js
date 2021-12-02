import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper, MapProps } from 'google-maps-react';
import { geolocated } from "react-geolocated";
import Geocode from "react-geocode";
import NZmap from './NZmap';
import NZinput from './Nzinput';
import "./NewZone.css"

class NewZone extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markers: {
                    title: "Vous etes ici",
                    name: "SOMA",
                    position: { lat: 48.8639907837, lng: 2.27723288536 }
                },
            center: {
                lat: 48.8639907837,
                lng: 2.27723288536
            },
            navlat: 0,
            navlng: 0,
            lat:0,
            lng:0,
            celat: 48.8639907837,
            celng: 2.27723288536,
            nrue:"",
            rue:"",
            ville:"",
            cp: ""
        };
    }



    componentDidMount() {
        navigator.geolocation.getCurrentPosition((position) => {
            console.log('lat', position.coords.latitude)
            console.log('lng', position.coords.longitude)
            this.setState({ navlat: position.coords.latitude });
            this.setState({ navlng: position.coords.longitude });
        });
    }

    Geoloc() {
        var lat = this.state.navlat
        var lng = this.state.navlng
        console.log('lat', lat, 'lng', lng)
        
        this.setState({
            lat: lat,
            lng: lng,
            celat: lat,
            celng: lng,
            markers: {position: {lat: lat, lng: lng}}
        })

        Geocode.setApiKey("AIzaSyD7ZmbMrmVkR19h8d5MfZQseosUypXDTZw");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                this.setState({
                    nrue: response.results[0].address_components[0].long_name,
                    rue: response.results[0].address_components[1].long_name,
                    ville: response.results[0].address_components[2].long_name,
                    cp: response.results[0].address_components[6].long_name,
                })
            },
            (error) => {
                console.error(error);
            }
        );
    }

    onMarkerDragEnd = (coord, index) => {
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
    
        this.setState({
            lat: lat,
            lng: lng,
            celat: lat,
            celng: lng,
            markers: {position: {lat: lat, lng: lng}}
        })
        Geocode.setApiKey("AIzaSyD7ZmbMrmVkR19h8d5MfZQseosUypXDTZw");
        Geocode.setLocationType("ROOFTOP");
        Geocode.enableDebug();
        Geocode.fromLatLng(lat, lng).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                this.setState({
                    nrue: response.results[0].address_components[0].long_name,
                    rue: response.results[0].address_components[1].long_name,
                    ville: response.results[0].address_components[2].long_name,
                    cp: response.results[0].address_components[6].long_name,
                })
            },
            (error) => {
                console.error(error);
            }
        );
      };


    render() {
        console.log('center', this.state.center.lat, this.state.center.lng)
        console.log(this.state.markers.position.lat)
        return (
            <div>
                <p>NEWZONE PAGE</p>

                <div id="Newzone">
                    <div style={{
                        width: "100%"
                    }}>
                        <p id="geolocbutton" onClick={(e) => this.Geoloc()} style={{
                            width: "100%",
                            marginTop: "30px",
                            height: "30px",
                            borderRadius: "25px",
                            backgroundColor: "white",
                            border: "solid 2px gold",
                            textAlign: "center",
                            paddingTop: "10px"
                        }}
                        >Utiliser ma localisation actuelle</p>
                    </div>
                    <div id="mapbox">
                        <div style={{ height: '400px', width: '100%', position: "relative", border: "solid 2px grey" }}>
                            <Map
                                google={this.props.google}
                                center={{
                                    lat: this.state.celat,
                                    lng: this.state.celng
                                  }}
                                zoom={15}
                                yesIWantToUseGoogleMapApiInternals = "true"
                            >
                                    <Marker
                                    draggable={true}
                                        title={this.state.markers.title}
                                        name={this.state.markers.name}
                                        position={this.state.markers.position}
                                        onDragend={(t, map, coord) => this.onMarkerDragEnd(coord)}
                                    />
                            </Map>
                        </div>
                        <div className="gpsbox">
                            <div style={{
                                width: "40%",
                                marginRight: "40px"
                            }}>
                                <p>Lattitude</p>
                                <input style={{
                                    width: "100%"
                                }} type="text" value={this.state.lat}/>
                            </div>
                            <div style={{
                                width: "40%"
                            }}>
                                <p>Longitude</p>
                                <input style={{
                                    width: "100%"
                                }}
                                    type="text" value={this.state.lng}/>
                            </div>
                        </div>
                    </div>
                    <div id="Coordbox">
                        <div id="inputbox">
                            <div className="streetbox">
                                <div style={{
                                    width: "120px",
                                    marginRight: "40px"
                                }}>
                                    <p>N° de la rue</p>
                                    <input style={{
                                        width: "100%"
                                    }} type="text" value={this.state.nrue}/>
                                </div>
                                <div style={{
                                    width: "500px"
                                }}>
                                    <p>Nom de la rue</p>
                                    <input style={{
                                        width: "100%"
                                    }}
                                        type="text" value={this.state.rue}/>
                                </div>
                            </div>
                            <div>
                                <p>Ville</p>
                                <input className="cityinput" type="text" value={this.state.ville}/>
                            </div>
                            <div>
                                <p>Code Postal</p>
                                <input className="cityinput" type="text" value={this.state.cp} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyD7ZmbMrmVkR19h8d5MfZQseosUypXDTZw")
})(NewZone);