import TestFile from "./geo/Copy";

let TestFileHelped = TestFile.features.map(feature => {
  coordinatesArray = feature.geometry.coordinates.map(polygon => {
    latLongArray = polygon.map(pair => {
      return {
        lat: pair[0],
        lng: pair[1]
      }
    })
    console.log(latLongArray)
    // let returnItem = { 
    //   ...feature, 
    //   geometry: {
    //     ...feature.geometry,
    //     coordinates: feat
    //   }
  
    // };
    
    // return 0
  })
})

export default TestFileHelped