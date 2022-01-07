import React, { useState, useEffect } from 'react';
import './App.css';

import axios from 'axios';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';



const position = [51.505, -0.09];

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(()=>{
    console.log(countries)
  })

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
    .then((response) => {
      setCountries(Object.values(response.data));  
    })
  }, []);

  return (
      <MapContainer 
      style={{ width: '100vw', height: '100vh' }}
      center={position}
      zoom={3}
      scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {
         countries.length && countries.map(({countryInfo}, index) => {
            return (
              <Marker key={index} position={[countryInfo.lat, countryInfo.long]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            )
          })
        }
    </MapContainer>
  );
}
 
export default App;