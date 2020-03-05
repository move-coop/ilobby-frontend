import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import { connect } from 'react-redux'
import { Header, Segment } from 'semantic-ui-react'

const centerOfNewYorkState = { lat: 42.6339359, lng: -75.9691296}
const mapStyles = {
  width: "100%",
  height: "80vh"
};
const opacity = {
  base: 0.15,
  hover: 0.25,
  selected: 0.3
}

class SPCMapsContainer extends React.Component {

  // POLYGON INTERACTIONS
  //########################
  // HOVER FUNCTIONALITY
  polygonMouseOverHandler = (mapProps, polygon, e) => {
    //only do this if the passed polygon is not in clickZoomed state
    if (!this.props.clickZoomed || this.props.clickZoomed.id !== polygon.id) {
      polygon.setOptions({fillOpacity: opacity.hover})
      this.props.setHoverLegislator({ ...mapProps})
    } 
  }

  polygonMouseOutHandler = (mapProps, polygon, e) => {
    //only do this if the passed polygon is not in clickZoomed state
    if (!this.props.clickZoomed || this.props.clickZoomed.id !== polygon.id) {
      polygon.setOptions({ fillOpacity: opacity.base })
      this.props.setHoverLegislator(null)
    }
  }


  // CLICK FUNCTIONALITY. 
  polygonClickHandler = (mapProps, polygon, e) => {
    
    // console log
    console.log('polygon click')
    
    // if this is a second click on the same polygon, zoom back out
    if (this.props.clickZoomed && this.props.clickZoomed.id === polygon.id) {
      // return opacity to normal
      this.props.clickZoomed.setOptions({ fillOpacity: opacity.base })

      // remove saved points and clickZoomed
      this.props.setSavedPoints(null)
      this.props.setClickZoomed(null)
      

      // if it is a first click...
    } else {

      // if another polygon been zoomed, put its opacity back
      if (!!this.props.clickZoomed) {
        this.props.clickZoomed.setOptions({ fillOpacity: opacity.base })
      }

      // set opacity darker of the newly clicked polygon
      polygon.setOptions({ fillOpacity: opacity.selected })

      // find the extent and set Points and ClickZoomed
      let extent = JSON.parse(mapProps.geo).extent
      this.props.setSavedPoints([
        { lat: extent[1], lng: extent[0] },
        { lat: extent[3], lng: extent[2] }
      ])
      this.props.setClickZoomed(polygon)
    }
  }

  // MAP INTERACTIONS
  //########################
  // Bounds change event listener. 
  // Made an infinite loop. Not sure it is necessary
  mapBoundsChangeHandler = (map) => {
    // debugger
    // console.log("bounds change handler", map)
    if (!this.props.setSavedPoints) {
      this.props.setSavedPoints([
        { lat: map.bounds.getNorthEast().lat(), lng: map.bounds.getNorthEast().lng()},
        { lat: map.bounds.getSouthWest().lat(), lng: map.bounds.getSouthWest().lng()}
      ])

    }
  }

  // used to clear out any saved points / click zoom
  mapClickHandler = () => {
    console.log("map onclick")

    // if a polygon been zoomed/selected, put its opacity back to normal, then remove saved points and clickZoomed
    if (!!this.props.clickZoomed) {
      this.props.clickZoomed.setOptions({ fillOpacity: opacity.base })
      this.props.setSavedPoints(null)
      this.props.setClickZoomed(null)
    }

  }

  // reducer to find the extent of the current displayPolygons
  centerReducer = (acc, legislator) => {
    
    JSON.parse(legislator.geo).extent.forEach(element => {
      const ele = parseFloat(element)
      if (ele > 0) {
        if (ele > acc.latmax || !acc.latmax) {
          acc = {
            ...acc,
            latmax: ele
          }
        }
        if (ele < acc.latmin || !acc.latmin) {
          acc = {
            ...acc,
            latmin: ele
          };
        } 
      } else {
        if (ele > acc.lonmax || !acc.lonmax) {
          acc = {
            ...acc,
            lonmax: ele
          }
        }
        if (ele < acc.lonmin || !acc.lonmin) {
          acc = {
            ...acc,
            lonmin: ele
          }
        }
      }

    })
    return acc
  }

// RENDER!!!!!!!!
  render() {
    console.log()

    let renderPolygons
    let preBounds
    let points
    let bounds

    // if store has legislators....
    if (this.props.legislators.length > 0) {
      // find the legislators with display === true
      const displayLegislators = this.props.legislators.filter(legislator => legislator.display === true)

      // map through them to create polygons
      renderPolygons = displayLegislators.map(legislator => {

        let paths = JSON.parse(legislator.geo).shape.coordinates[0][0].map(pair => ({ lat: pair[1], lng: pair[0] }))
        return <Polygon 
          key={legislator.id} 
          {...legislator} 
          paths={paths}
          strokeColor="#000000"
          strokeOpacity={0.7}
          strokeWeight={!!legislator.selected ? 5 : 1}
          fillColor={legislator.party === "Democratic" ? this.props.colors.democratic : this.props.colors.republican}
          fillOpacity={opacity.base}
          onMouseover={this.polygonMouseOverHandler}
          onMouseout={this.polygonMouseOutHandler}
          onClick={this.polygonClickHandler}
        />
      })  // end of renderPolygons definition


      // create points to pass to a new bounds object
      // if store has savedPoints those take priority for map bounds
      if (this.props.savedPoints) {

        points = this.props.savedPoints

      } else {
        // otherwise find the extent of the current filterselection
        // create and object with the NSEW coordinates
        preBounds = displayLegislators.reduce(this.centerReducer, {
          latmax: null,
          latmin: null,
          lonmax: null,
          lonmin: null
        });
  
        // if statement to set points from preBounds, if all 4 points exist, or set back to initial state.
        if (!!preBounds.latmax && preBounds.latmin && preBounds.lonmax && preBounds.lonmin) {
          points = [
            {lat: preBounds.latmax, lng: preBounds.lonmax},
            {lat: preBounds.latmin, lng: preBounds.lonmin}
          ]
        } else {
          console.log("no results, default points")
        
          points = [
            centerOfNewYorkState,
            { lat: 45.015864999999984, lng: -71.77749099999998},
            { lat: 40.477398999999984, lng: -79.76258999999997}
          ]
        }
      }   
        
      // created a bounds object, include points, ready to define map.
      bounds = new this.props.google.maps.LatLngBounds();
          
      for (var i = 0; i < points.length; i++) {
        bounds.extend(points[i]);
      }

    }
    
    // RENDER RETURN <Map> in div#map
    return (
      <div id="map">
     
        <Map
          google={this.props.google}
          zoom={6.5}
          style={mapStyles}
          disableDefaultUI={true}
          mapType={"terrain"}
          initialCenter={centerOfNewYorkState}
          bounds={bounds}
          gestureHandling='greedy'
          onBounds_changed={(map) => this.mapBoundsChangeHandler(map)}
          onClick={this.mapClickHandler}

        >
          {renderPolygons}
        </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    legislators: state.legislators,
    searchFilter: state.searchFilter,
    clickZoomed: state.clickZoomed,
    savedPoints: state.savedPoints,
    // hoverLegislator: state.hoverLegislator,
    colors: state.colors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editSearchFilter: (value) => {
      dispatch({ type: "SEARCH_FILTER", payload: value });
    },
    setClickZoomed: (value) => {
      dispatch({ type: "SET_CLICK_ZOOMED", payload: value})
    },
    setSavedPoints: (value) => {
      dispatch({ type: "SET_SAVED_POINTS", payload: value})
    },
    setHoverLegislator: (value) => {
      dispatch({ type: "SET_HOVER_LEGISLATOR", payload: value})
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer));

