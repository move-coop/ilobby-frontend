import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import { connect } from 'react-redux'


class SPCMapsContainer extends React.Component {

  // districtCoords: this.state.geoJSON.shape.coordinates[0][0].map(pair => ({ lat: pair[1], lng: pair[0] }))

  render() {

    let renderPolygons
    console.log("displayLegislators", this.props.displayLegislators)

    if (this.props.displayLegislators.length > 0) {
      renderPolygons = this.props.displayLegislators.map(legislator => {

        // console.log(JSON.parse(legislator.geo))
        
        let paths = JSON.parse(legislator.geo).shape.coordinates[0][0].map(pair => ({ lat: pair[1], lng: pair[0] }))
        
        console.log("id", legislator.id, ", paths:", paths)
        // return legislator
        
        return <Polygon 
        key={legislator.id} 
        {...legislator} 
        paths={paths}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
        fillColor="#0000FF"
        fillOpacity={0.35}
        />
      })
    }


    const mapStyles = {
      width: "100%",
      height: "80vh"
    };

    console.log("renderPolygons", renderPolygons)
    
    return (
      <div id="map">
        <Map
          google={this.props.google}
          zoom={7.3}
          style={mapStyles}
          disableDefaultUI={true}
          mapType={"terrain"}
          initialCenter={{ lat: 42.985056, lng: -78.944561 }}
        >
          {renderPolygons}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    displayLegislators: state.displayLegislators
  }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer));

