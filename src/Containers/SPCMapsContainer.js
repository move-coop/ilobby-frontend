import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";


class SPCMapsContainer extends React.Component {
  render() {

    const mapStyles = {
      width: "100%",
      height: "100%"
    };

    const triangleCoords = [
      { lat: 25.774, lng: -80.19 },
      { lat: 18.466, lng: -66.118 },
      { lat: 32.321, lng: -64.757 },
      { lat: 25.774, lng: -80.19 }
    ];

    return (
      <div id="map">
        <Map
          google={this.props.google}
          zoom={7.3}
          style={mapStyles}
          disableDefaultUI={true}
          mapType={"satellite"}
          initialCenter={{ lat: 42.8182876, lng: -75.9917835 }}
        >
          {/* {displayPolygons} */}
          <Polygon
            // key={feature.properties.OBJECTID_1}
            paths={triangleCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          />
        </Map>
      </div>
    );
  }
}

// export default SPCMapsContainer;

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer);