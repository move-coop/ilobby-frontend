import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import { connect } from 'react-redux'


class SPCMapsContainer extends React.Component {

  // districtCoords: this.state.geoJSON.shape.coordinates[0][0].map(pair => ({ lat: pair[1], lng: pair[0] }))

  render() {

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
          {/* {displayPolygons} */}
          {/* <Polygon
            // key={feature.properties.OBJECTID_1}
            paths={this.state.districtCoords}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2}
            fillColor="#0000FF"
            fillOpacity={0.35}
          /> */}
        </Map>
      </div>
    );
  }
}


// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
// })(SPCMapsContainer);

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
    searchFilter: state.searchFilter,
    chamberFilter: state.chamberFilter,
    partyFilter: state.partyFilter,
    committeeFilter: state.committeeFilter,
    renderedLegislatorCount: state.renderedLegislatorCount
    // exampleMessage: state.exampleState.exampleMessage
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateRenderedLegislatorCount: (count) => {
      dispatch({ type: "UPDATE_RENDERED_LEGISLATOR_COUNT", payload: count })
    }
  }
  // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
}

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer));

