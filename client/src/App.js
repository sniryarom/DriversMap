import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './App.css';
import { subscribeToDrivers } from './api';

const mapStyles = {
  width: '100%',
  height: '100%'
}

const markerStyle = {
  height: '50px',
  width: '50px',
  marginTop: '-50px'
}

const imgStyle = {
  height: '100%'
}

class DriverData {

  constructor(id, state, position) {
    this.id = id;
    this.state = state;
    this.position = position;
  }
}

const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} src="https://cdn2.iconfinder.com/data/icons/vehicle-type/1024/suv-512.png" alt={title} />
    <h3>{title}</h3>
  </div>
);

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      center: {lat: 48.83921794298303, lng: 2.3558752615457},
      locations: [],
      users_online: [],
      current_user: '',
      timestamp: 'no stamps yet'
    }
  }

  // callAPI() {
  //   fetch("http://localhost:9000/drivers")
  //     .then(res => res.json())
  //     .then(json => { 
  //       this.setState({ 
  //         center: json.center, 
  //         locations: json.locations
  //       });
  //       console.log(json);
  //     })
  //     .catch(err => {
  //       console.log('an error has occured while fetching data from API: ' + err);
  //     });

  //   }


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
        
    //   this.setState( state => {
    //     var locations = state.locations.map(data, index => {
    //       if (index === driverData.id) {
    //         return driverData;
    //       } else {
    //         return data;
    //       }
    //     });
    //     return { locations };
    //    });
     });
  }

   render() {
    let locationMarkers = this.state.locations.map((value, index) => {
      //console.log('rendering driver position lat: ' + value.position[0] + ', lng: ' + value.position[1])
    return (
        <Marker
          key={index}
          title={value.state}
          lat={value.position[0]}
          lng={value.position[1]}
        >
        </Marker>
      );
    });

    return (
      <div >
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: 'AIzaSyBSsICbZ6zyliCdgYcUyEIW5VVq1tIyshI' }}
          center={this.state.center}
          zoom={14}
        >
          {locationMarkers}
        </GoogleMap>
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
