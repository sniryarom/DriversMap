import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import { subscribeToDrivers } from './api';
import Marker from './Marker.js';
import DriverData from './DriverData';
import * as constants from './constants';
import './App.css';

const mapStyles = {
  width: '100px',
  height: '100px',
}

const mapCenter = {
  lat: 48.83921794298303, 
  lng: 2.3558752615457
};

class App extends Component {

  constructor(props) {
    super(props);
    var newLocations = [];
    //load driver locations from local storage first
    if (localStorage.getItem('locations') !== null) {
      newLocations = JSON.parse(localStorage.getItem('locations'));
    }
    this.state = {
      locations: newLocations
    }
  }

  componentDidMount() {
    var newLocations = [];

    //then load from server
    subscribeToDrivers((err, data) => {
      let dataObj = JSON.parse(data);
      //console.log('updated driver data (from server): ' + JSON.stringify(dataObj));
      let driverData = new DriverData(dataObj.id, dataObj.state, dataObj.position);
      newLocations = this.state.locations.slice() //copy the array
      let driverFound = false;
      for (var i = 0; i < newLocations.length - 1; i++) {
        if (newLocations[i].id === driverData.id) { //driver is in our location list
          newLocations[i] = driverData; // update the specific driver location
          driverFound = true;
          break;
        }
      }
      //add the driver if he's not in the location array, and the location array contains less than MAX_NUM drivers
      if (!driverFound && newLocations.length < constants.MAX_NUM_DRIVERS) {
        newLocations.push(driverData);
      }
      //set the new state to re-render
      this.setState({locations: newLocations}); 
      //and save updated locations in the localstorage
      localStorage.setItem('locations', JSON.stringify(this.state.locations));
     });

  }

  // componentWillMount() {
  //   var newLocations = [];
  //   //load driver locations from local storage first
  //   if (localStorage.getItem('locations') !== null) {
  //     newLocations = JSON.parse(localStorage.getItem('locations'));
  //     //set the new state to re-render
  //     this.setState({locations: newLocations});
  //   }
  // }

  render() {
    let locationMarkers = this.state.locations.map((value, index) => {
      var status = Date.now() - value.updateTime > constants.NO_SERVICE_INTERVAL_MILI ? 'unavailable' : value.state;
      //console.log('rendering driver position lat: ' + value.position[0] + ', lng: ' + value.position[1])
    return (
        <Marker
          key={index}
          title={status === 'unavailable' ? 'no service' : value.state}
          status={status}
          lat={value.position[0]}
          lng={value.position[1]}
        >
        </Marker>
      );
    });
    
    return (
      <div>
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: 'AIzaSyBSsICbZ6zyliCdgYcUyEIW5VVq1tIyshI' }}
          center={mapCenter}
          zoom={14}
        >
          {locationMarkers}
        </GoogleMap>
      </div>  
    )
  }
}

export default App;
