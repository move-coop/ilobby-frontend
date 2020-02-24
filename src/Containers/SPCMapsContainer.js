import React from "react";
import { Map, GoogleApiWrapper, Polygon, InfoBox } from "google-maps-react";
import { connect } from 'react-redux'


const colors = {
  democratic: "#0000FF",
  republican: "#FF0000"
}

class SPCMapsContainer extends React.Component {

  render() {

    let renderPolygons

    if (this.props.legislators.length > 0) {
      const displayLegislators = this.props.legislators.filter(legislator => legislator.display === true)
      renderPolygons = displayLegislators.map(legislator => {
   
        let paths = JSON.parse(legislator.geo).shape.coordinates[0][0].map(pair => ({ lat: pair[1], lng: pair[0] }))
                
        return <Polygon 
          key={legislator.id} 
          {...legislator} 
          paths={paths}
          strokeColor="#000000"
          strokeOpacity={0.7}
          strokeWeight={1}
          fillColor={legislator.party === "Democratic" ? colors.democratic : colors.republican}
          fillOpacity={0.25}
          onMouseover={() => {  }}
          onMouseout={() => {  }}
          onClick={(obj) => { console.log(obj) }}
        />
      })
    }

    const mapStyles = {
      width: "100%",
      height: "80vh"
    };
    
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
    legislators: state.legislators
  }
}

export default connect(mapStateToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer));

