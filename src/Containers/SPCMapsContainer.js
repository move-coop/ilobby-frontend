import React from "react";
import { Map, GoogleApiWrapper, Polygon } from "google-maps-react";
import { connect } from 'react-redux'


const colors = {
  democratic: "#0000FF",
  republican: "#FF0000"
}

const selected = {

}

const centerOfNewYorkState = { lat: 42.6339359, lng: -75.9691296}


class SPCMapsContainer extends React.Component {

  state = {
    clickZoomed: false,
    // savedBounds: null,
    savedPoints: null

  }

  polygonMouseOverHandler = (props, polygon, e) => {
    polygon.setOptions({fillOpacity: 0.4})

  }

  polygonMouseOutHandler = (props, polygon, e) => {
    polygon.setOptions({ fillOpacity: 0.25 })
  }

  polygonClickHandler = (props, polygon, e) => {
    
    console.log('polygon click')
    
    // if points are currently saved and you click on a new polygon, it removes the saved points
    if (this.state.savedPoints) {
      this.setState({
        savedPoints: null
      })
    }

    // if you are already zoomed in, remove clickZoomed, get current bounds and save them
    // then clear the input searchfilter
    // if (!!this.state.clickZoomed) {
    //   let savedBounds = polygon.map.getBounds()

    //   this.setState({
    //     clickZoomed: false,
    //     savedPoints: [
    //       { lat: savedBounds.getNorthEast().lat(), lng: savedBounds.getNorthEast().lng()},
    //       { lat: savedBounds.getSouthWest().lat(), lng: savedBounds.getSouthWest().lng()}
    //     ]

    //   }, this.props.editSearchFilter(""))
      
    // } else {
      // this.props.editSearchFilter(props.name)
      // WANT TO ADJUST THIS FEATURE: zoom to the object without using the filter
      let extent = JSON.parse(props.geo).extent
      
      this.setState({
        // clickZoomed: true,
        savedPoints: [
          {lat: extent[1], lng: extent[0]},
          {lat: extent[3], lng: extent[2]}
        ]
      })
    // }
  }

  mapBoundsChangeHandler = () => {
    console.log("bounds changed!")
    if (this.state.savedPoints) {
      this.setState({
        savedPoints: null
      })
    }
  }

  mapClickHandler = () => {
    console.log("map onclick")
    if (this.state.savedPoints) {
      this.setState({
        savedPoints: null
      })
    }
  }

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


  render() {

    let renderPolygons
    let preBounds
    let points
    let bounds

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
          strokeWeight={!!legislator.selected ? 5 : 1}
          fillColor={legislator.party === "Democratic" ? colors.democratic : colors.republican}
          fillOpacity={0.25}
          onMouseover={this.polygonMouseOverHandler}
          onMouseout={this.polygonMouseOutHandler}
          onClick={this.polygonClickHandler}
        />
      })

      console.log("pick your bounds")
      if (this.state.savedPoints) {
        points = this.state.savedPoints

      } else {
        preBounds = displayLegislators.reduce(this.centerReducer, {
          latmax: null,
          latmin: null,
          lonmax: null,
          lonmin: null
        });
  
        // if statement to set points to preBounds, if all 4 points exist, or set to initial state.
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
        // debugger
        bounds = new this.props.google.maps.LatLngBounds();
        
        for (var i = 0; i < points.length; i++) {
          bounds.extend(points[i]);
        }

    }

    const mapStyles = {
      width: "100%",
      height: "80vh"
    };
    
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
          // onBounds_changed={this.mapBoundsChangeHandler}
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
    searchFilter: state.searchFilter
  }
}

const mapDispatchToProps = dispatch => {
  return {
    editSearchFilter: (value) => {
      dispatch({ type: "SEARCH_FILTER", payload: value });
    }
    // changeExampleMessage: () => { dispatch(changeExampleMessage()) }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAPS_API_KEY
})(SPCMapsContainer));

