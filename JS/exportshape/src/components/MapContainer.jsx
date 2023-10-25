import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import * as turf from '@turf/turf';
import * as geolib from "geolib";
import * as shpwrite from "@mapbox/shp-write";
// import turf from 'turf';
// import { Map, Marker, Polygon } from "google-map-react";



const OneCoordinateSet = [
    { lat: null, long: null },
    { lat: null, long: null },
    { lat: null, long: null },
    { lat: null, long: null }
  ];

  const OneRunwayMarkers = [
    { lat: 44.4719556, lng: -73.1532783, label: "Marker1.1" },
    { lat: 44.4719557, lng: -73.1532783, label: "Marker1.2" }
  ];

const CenterCoordinates = [44.4719556, -73.1532783];
const mapStyles = {
  width: "100%",
  height: "100%"
};

export const MapContainer = () => {
    const [estado, setEstado] = useState({
        //This is to cover multiple Runways
        Filename: "",
        Coordinates: [OneCoordinateSet],
        AllRunwaysMarkers: [OneRunwayMarkers],
        Centers: [CenterCoordinates],
        open: false
    });
    const { AllRunwaysMarkers, Centers, Filename } = estado;
    const fromArrayToObject = Array => {
      let arr = [];
  
      Array.forEach(e => {
        arr.push({ lat: e[0], lng: e[1] });
      });
      return arr;
    };
      //Find lines intersections between polygons
    const getPolygons = () => {
      // const { AllRunwaysMarkers } = state;
      let Polygons = [];
      // let This = this;
      AllRunwaysMarkers.forEach(function(singleRunwayMarkers) {
        console.log(singleRunwayMarkers);
        let p = calculateNewCoordinate(singleRunwayMarkers);
        Polygons.push([...p, p[0]]);
      });

      let newPolygons = turf.polygon([fromObjectToArray(Polygons[0])]);
      for (let i = Polygons.length; i - 1 > 0; i--) {
        let p = turf.polygon([fromObjectToArray(Polygons[i - 1])]);
        newPolygons = turf.polygon([
          turf.union(newPolygons, p).geometry.coordinates[0]
        ]);
      }

      return fromArrayToObject(newPolygons.geometry.coordinates[0]);
    };
    const fromObjectToArray = (ObjectArray) => {
      let arr = [];
  
      ObjectArray.forEach(e => {
        arr.push([e.lat, e.lng]);
      });
      return arr;
    };
    const getBearing = (Markers) => {
      return geolib.getRhumbLineBearing(Markers[0], Markers[1]);
    }
    const calculateNewCoordinate = Markers => {
      let Bearing = getBearing(Markers);
      let newCoordinates = [];
  
      let UpperCenter = geolib.computeDestinationPoint(
        { latitude: Markers[0].lat, longitude: Markers[0].lng },
        5000,
        Bearing + 180
      );
  
      let LowerCenter = geolib.computeDestinationPoint(
        { latitude: Markers[1].lat, longitude: Markers[1].lng },
        5000,
        Bearing + 360
      );
  
      newCoordinates.push(
        getLatitudeAndLongitude(UpperCenter, 2500, Bearing + 90)
      );
      newCoordinates.push(
        getLatitudeAndLongitude(LowerCenter, 2500, Bearing + 90)
      );
      newCoordinates.push(
        getLatitudeAndLongitude(LowerCenter, 2500, Bearing + 270)
      );
      newCoordinates.push(
        getLatitudeAndLongitude(UpperCenter, 2500, Bearing + 270)
      );
  
      return newCoordinates;
    };

    const getLatitudeAndLongitude = (pointOfReference, Distance, bearing) => {
      // bearing his is Bearing+ Degrees
      let calc = geolib.computeDestinationPoint(
        pointOfReference,
        Distance,
        bearing
      );
      return { lat: calc.latitude, lng: calc.longitude };
    }

    const AddRunway = () => {
      const { AllRunwaysMarkers, Centers } = estado;
      const length = AllRunwaysMarkers.length;
      let newlat1 = AllRunwaysMarkers[0][0].lat + 0.00001;
      let newMarker = [
        {
          lat: AllRunwaysMarkers[0][0].lat,
          lng: AllRunwaysMarkers[0][0].lng,
          label: `Marker${length}.1`
        },
        {
          lat: newlat1,
          lng: AllRunwaysMarkers[0][0].lng,
          label: `Marker${length}.2`
        }
      ];
  
      Centers.push([Centers[0][0], Centers[0][1]]);
      AllRunwaysMarkers.push(newMarker);
      setEstado({ AllRunwaysMarkers, Centers });
    };

    const onCoordinateChange = (coord) => e => {
      const { Centers } = estado;
      if (coord === "lat") {
        Centers[0][0] = e.target.value;
      } else if (coord === "lng") {
        Centers[0][1] = e.target.value;
      }
      setEstado({
        Centers
      });
    };

    const RemoveRunway = (index) => {
      console.log("index", index);
      const { AllRunwaysMarkers } = estado;
      // do not put inside setState, as this will return the element poped
      AllRunwaysMarkers.pop();
      setEstado({ AllRunwaysMarkers });
    };

    const setMapCenter = () => {
      const { Centers, AllRunwaysMarkers } = estado;
      let AllRunwaysMarkersNew = [];
      //For each pair of Markers, update their coordinates to be in the new Center
      AllRunwaysMarkers.forEach(function(MarkerPair) {
        AllRunwaysMarkersNew.push([
          { lat: Centers[0][0], lng: Centers[0][1], label: MarkerPair[0].label },
          { lat: Centers[0][0], lng: Centers[0][1], label: MarkerPair[1].label }
        ]);
      });
  
      setEstado({
        AllRunwaysMarkers: AllRunwaysMarkersNew
      });
    };

    const onNameFile = () => e => {
      setEstado({ Filename: e.target.value });
    };

    const ForShapeFile = ObjectArray => {
      let arr = [];
  
      ObjectArray.forEach(e => {
        arr.push([e.lng, e.lat]);
      });
      return arr;
    };

    const downloadShapeFile = p => {
      //console.log("fcn called");
      const { Filename } = estado;
      // let p1 = ForShapeFile(p);
      // console.log([[[...p1]]]);

      const p1 = [
        [-73.12179575600433, 44.426985195858684],
        [-73.1217472056982, 44.516917442853384],
        [-73.18480939430178, 44.516917442853384],
        [-73.18476084399566, 44.426985195858684],
        [-73.12179575600433, 44.426985195858684]
    ]

      let name = Filename === "" ? "myFiles" : Filename;
      let options = {
        folder: name,
        types: {
          polygon: name
        }
      };
      shpwrite.download(
        {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [[[...p1]]]
              },
              properties: {
                name: "DefaultName"
              }
            }
          ]
        },/* 
        options */
      );
      //console.log("coordinates calculated", p1);
    };

    let pg = getPolygons();
    return (
        
        <div>
          <Button variant="outlined" onClick={() => AddRunway()}>
            ADD RUNWAY
          </Button>
          <Button
            variant="outlined"
            onClick={() => RemoveRunway(AllRunwaysMarkers.length - 1)}
          >
            REMOVE RUNWAY
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <TextField
              id="standard-name"
              label="Latitude"
              value={Centers[0][0]}
              onChange={onCoordinateChange("lat")}
              margin="normal"
            />
            <TextField
              id="Longitude"
              label="Longitude"
              value={Centers[0][1]}
              onChange={onCoordinateChange("lng")}
              margin="normal"
            />
            <Button variant="outlined" onClick={() => setMapCenter()}>
              Find Location
            </Button>
          </div>
          {/* <div>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div>
                <Button onClick={handleClick}>Remove Runway</Button>
                {open ? (
                  <Paper style={{ width: 100 }}>
                    {AllRunwaysMarkers.map((marker, index) => {
                      return (
                        <Typography
                          onClick={() => {
                            RemoveRunway(index);
                          }}
                        >
                          Runway# {index + 1}
                        </Typography>
                      );
                    })}
                  </Paper>
                ) : null}
              </div>
            </ClickAwayListener>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20
            }}
          >
            <TextField
              id="standard-name"
              label="File Name"
              value={Filename}
              onChange={onNameFile()}
              margin="normal"
            />
  
            <Button variant="outlined" onClick={() => downloadShapeFile(pg)}>
              Download shape file
            </Button>
          </div>
          {/*  <Grid container spacing={3} style={{ marginBottom: 20 }}>
            <Grid item xs={12} md={6}>
              <Grid
                container
                spacing={1}
                direction="column"
                alignItems="flex-start"
              >
                <Grid item>
                  <ButtonGroup
                    size="small"
                    aria-label="Small outlined button group"
                  >
                    {AllRunwaysMarkers.map((marker, index) => {
                      return (
                        <Button onClick={() => setCenter(index)}>
                          get Center{index + 1}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid> */}
          {/* <Map
            google={props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
              lat: Centers[0][0],
              lng: Centers[0][1]
            }}
            center={{
              lat: Centers[0][0],
              lng: Centers[0][1]
            }}
          >
            {AllRunwaysMarkers.map((marker, index) => {
              return marker.map((singleMarker, i) => {
                let k = `Marker${index}.${i}`;
                return (
                  <Marker
                    key={k}
                    draggable={true}
                    position={{ lat: singleMarker.lat, lng: singleMarker.lng }}
                    label={singleMarker.label}
                    onDragend={(t, map, coord) =>
                      onMarkerMoveEnd(coord, index, i)
                    }
                  />
                );
              });
            })}
            <Polygon
              strokeColor={"#000000"}
              strokeOpacity={1.0}
              strokeWeight={2}
              paths={pg}
              fillColor={"#FF0000"}
              fillOpacity={0.35}
            />
          </Map> */}
        </div>
      );
}
