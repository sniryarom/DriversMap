import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import './App.css';

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
      center: {lat: 5.6219868, lng: -0.23223},
      locations: [],
      users_online: [],
      current_user: ''
    }
  }

  callAPI() {
    fetch("http://localhost:9000/drivers")
      .then(res => res.json())
      .then(json => { 
        this.setState({ 
          center: json.center, 
          locations: json.locations
        });
        console.log(json);
      })
      .catch(err => {
        console.log('an error has occured while fetching data from API: ' + err);
      });

    }


  componentDidMount() {
    this.callAPI();
  }

   render() {
    let locationMarkers = this.state.locations.map((value, index) => {
    return (
        <Marker
          key={index}
          title={value.username}
          lat={value.lat}
          lng={value.lng}
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
          zoom={17}
        >
          {locationMarkers}
        </GoogleMap>
      </div>
    )
  }
}

export default App;
