import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fixing default icon issue in Leaflet for React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const Coverage = () => {
  const dhakaCoordinates = [23.8103, 90.4125]; // Central point in Bangladesh

  return (
    <div className="w-full h-screen p-4 rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4 text-cyan-200 text-center">Our Coverage Area - Bangladesh</h2>
      <MapContainer
        center={dhakaCoordinates}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-[500px] rounded-xl shadow-md"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        <Marker position={dhakaCoordinates}>
          <Popup>
            Dhaka - Our main hub!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Coverage;
