import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './App.css';
import { subscribeToDrivers } from './api';
import DriverData from './DriverData';

const mapStyles = {
  width: '100%',
  height: '95%'
}

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-100px',
  color: 'green',
  textAlign: 'center'
}

const imgStyle = {
  height: '100%'
}

const Marker = ({ title, status }) => {
  var cssClass = '';
  switch(status) {
    case 'available':
      cssClass = 'marker-title available';
      break;
    case 'ride':
      cssClass = 'marker-title ride';
      break;
    case 'unavailable':
    default:
      cssClass = 'marker-title unavailable';
      break;
  }
  return (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://cdn2.iconfinder.com/data/icons/vehicle-type/1024/suv-512.png" alt={title} />
    <h3 class={cssClass}>{title}</h3>
  </div>
  )
};

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      center: {lat: 48.83921794298303, lng: 2.3558752615457},
      locations: []
    }
  }

  componentWillMount() {
    //this.callAPI();
    subscribeToDrivers((err, data) => {
      let dataObj = JSON.parse(data);
        //console.log('updated driver data (from server): ' + JSON.stringify(dataObj));
        let driverData = new DriverData(dataObj.id, dataObj.state, dataObj.position);
        var newLocations = this.state.locations.slice() //copy the array
        let driverFound = false;
        for (var i = 0; i < newLocations.length - 1; i++) {
          if (newLocations[i].id === driverData.id) {
            newLocations[i] = driverData; // update the specific driver location
            driverFound = true;
            break;
          }
        }
        if (!driverFound && newLocations.length < 10) {
          newLocations.push(driverData);
        }
        //console.log('current: ' + this.state.locations);
        //console.log('updated: ' + newLocations);
        this.setState({locations: newLocations}); //set the new state
     });
  }

   render() {
    let locationMarkers = this.state.locations.map((value, index) => {
      var status = Date.now() - value.updateTime > 10000 ? 'unavailable' : value.state;
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
        <div class="title">
          <h2 class="title"></h2>
        </div>
        <div class="mapContainer" >
          <GoogleMap
            style={mapStyles}
            bootstrapURLKeys={{ key: 'AIzaSyBSsICbZ6zyliCdgYcUyEIW5VVq1tIyshI' }}
            center={this.state.center}
            zoom={14}
          >
          
            {locationMarkers}
          </GoogleMap>
      </div>
     </div>
    //   <div className="App">
    //   <p className="App-intro">
    //   This is the timer value: {this.state.timestamp}
    //   </p>
    // </div>

    )
  }
}

export default App;
