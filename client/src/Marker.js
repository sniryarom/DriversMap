/**
 * A driver location marker for google maps
 */

import React from 'react';

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
    <div class="marker-style">
      <img class="img-style" src="https://cdn2.iconfinder.com/data/icons/vehicle-type/1024/suv-512.png" alt={title} />
      <h3 class={cssClass}>{title}</h3>
    </div>
    )
  };

  export default Marker;