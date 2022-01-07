import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import {Icon} from 'leaflet';

const position = [51.505, -0.09];

function App() {
  const [countries, setCountries] = useState([]);
  const [world, setWorld] = useState([]);

  useEffect(()=>{
    console.log(world)
  })

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
    .then((response) => {
      setCountries(Object.values(response.data));  
    });

    axios.get('https://disease.sh/v3/covid-19/all')
    .then((response) => {
      setWorld(response.data);  
    })
  }, []);

  return (
    <>
      <MapContainer 
      style={{ width: '100vw', height: '80vh' }}
      center={position}
      zoom={3}
      scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
         countries.length && countries.map((country, index) => {
            return (
              <Marker
               key={index} 
               position={[country.countryInfo.lat, country.countryInfo.long]}
               icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}
               >
                <Popup>
                <p>Today cases: {country.todayCases}</p>
                <p>Today deaths: {country.todayDeaths}</p>
                <p>Today recovered: {country.todayRecovered}</p>
                </Popup>
              </Marker>
            )
          })
        }
    </MapContainer>
        <div style={{ width: '100vw', height: '20vh' }}>
          <p>World cases: {world.cases}</p>
          <p>World deaths: {world.deaths}</p>
          <p>World recovered: {world.recovered}</p>
        </div>
    </>
  );
}
 
export default App;