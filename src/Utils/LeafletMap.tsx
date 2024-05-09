import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { CountryData } from '../constants/types';
import "leaflet/dist/leaflet.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';


let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

function LeafletMap({ countriesData }: { countriesData: CountryData[] | null }) {  
  const center = [51.51, -0.09];
  return (
    <div>
    <MapContainer  center={center as [number, number]} zoom={13} scrollWheelZoom={true}
     id="map"
    style={{
      height:"100vh"
    }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {countriesData?.map((country) => 
      {
        const coordinates = [country.countryInfo.lat, country.countryInfo.long];
      return(
        <Marker key={country.country} position={coordinates as [number, number]}>
          <Popup>
            <div>
              <b>{country.country}</b>
              <br />
              Active: {country.active}
              <br />
              Recovered: {country.recovered}
              <br />
              Deaths: {country.deaths}
            </div>
          </Popup>
        </Marker>
      )})}
    </MapContainer>
    </div>
  );
}

export default LeafletMap;