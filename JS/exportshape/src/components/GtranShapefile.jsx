import React from 'react'

import * as shp from 'gtran-shapefile';

const geojson = {"type": "FeatureCollection",
"features": [{
  "type": "Feature",
  "geometry": { "type": "Point", "coordinates": [102.0, 0.5] },
  "properties": { "prop0": "value0" }
}]
}


export const GtranShapefile = () => {
    shp.setPromiseLib(require('bluebird'));

    shp.fromGeoJson(geojson, 'point.shp', {
        // ESRI WKT string of WGS84
        esriWKT: 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["Degree",0.017453292519943295]]'
      })
      .then(function(fileNames) {
          console.log('files have been saved at:' + fileNames);
      });
  return (
    <div>GtranShapefile</div>
  )
}
