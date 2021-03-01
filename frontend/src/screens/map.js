import React, { Component } from 'react'
import { getDistance , getPreciseDistance } from 'geolib';

export default class map extends Component {


        constructor(props){
                super(props);
                this.state= {
                        latitude : null , 
                        longitude : null ,

                }

                this.getLocation = this.getLocation.bind(this)
                this.getCoordinates = this.getCoordinates.bind(this)
        }


        getLocation(){
                if(navigator.geolocation){
                        navigator.geolocation.getCurrentPosition(this.getCoordinates , this.showError)
                }
                else {
                        alert('Geolocation is not supported by the browser')
                }
        }

        getCoordinates(position){
                console.log(position);
                this.setState({
                        latitude : position.coords.latitude , 
                        longitude : position.coords.longitude
                })


                const x = getDistance(
                        { latitude: position.coords.latitude , longitude: position.coords.longitude },
                        { latitude: 30 , longitude: 70 }
                    );

                console.log( 'distance from geolib' , x);

                console.log('shortest distance' , ((30 - position.coords.latitude)**2 - (70 - position.coords.longitude)**2 )**0.5 );

                return x
        }


        distance = (inp) =>{
                const x = getDistance(
                        { latitude: this.state.latitude , longitude: this.state.longitude },
                        { latitude: inp , longitude: 70 }
                    );

                console.log( 'distance from geolib' , x);


                return x
        }






        showError(error) {
                switch(error.code) {
                  case error.PERMISSION_DENIED:
                    alert("User denied the request for Geolocation.")
                    break;
                  case error.POSITION_UNAVAILABLE:
                        alert("Location information is unavailable.")
                    break;
                  case error.TIMEOUT:
                        alert("The request to get user location timed out.")
                    break;
                  default:
                        alert("An unknown error occurred.")
                    
                }
              }





        render() {
                return (
                        <div>
                                <h2>React Maps</h2>
                                <button onClick={this.getLocation}>Get Locations</button>
                                <p>Latitude : {this.state.latitude} </p>
                                <p>Longitude : {this.state.longitude} </p>
                                <p> {this.state.longitude && this.distance(30) } </p>
                                <p> {this.state.longitude && this.distance(40) } </p>
                                <p> {this.state.longitude && this.distance(50) } </p>
                                <p> {this.state.longitude && this.distance(60) } </p>
                        </div>
                )
        }
}
