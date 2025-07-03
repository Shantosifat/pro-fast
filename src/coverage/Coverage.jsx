import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useLoaderData } from 'react-router';

// Fix for missing Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

const bangladeshBounds = [
  [20.5, 88.0],
  [26.7, 92.7]
];

// FlyTo Component (uses animation)
const FlyToLocation = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 10, { duration: 2 });
    }
  }, [lat, lng, map]);
  return null;
};

// SearchBox
const SearchBox = ({ input, setInput, onSearch }) => (
  <div className="mb-4 text-center flex justify-center gap-2">
    <input
      type="text"
      placeholder="Enter district name..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      className="px-4 py-2 border rounded-lg w-[300px] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <button
      onClick={onSearch}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      Search
    </button>
  </div>
);

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [inputDistrict, setInputDistrict] = useState('');
  const [filteredCenters, setFilteredCenters] = useState(serviceCenters);
  const [targetLocation, setTargetLocation] = useState(null);
  const popupRef = useRef(null);

  const handleSearch = () => {
    const match = serviceCenters.filter(center =>
      center.district.toLowerCase().includes(inputDistrict.toLowerCase())
    );
    setFilteredCenters(match);

    if (match.length > 0) {
      setTargetLocation({ lat: match[0].latitude, lng: match[0].longitude });
    } else {
      setTargetLocation(null);
      alert('No matching district found');
    }
  };

  // Auto-open popup after targetLocation is set
  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.openPopup();
    }
  }, [targetLocation]);

  return (
    <div className="w-[800px] mx-auto my-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold text-center mb-2">
        Warehouse Coverage in Bangladesh
      </h2>

      <SearchBox
        input={inputDistrict}
        setInput={setInputDistrict}
        onSearch={handleSearch}
      />

      <MapContainer
        bounds={bangladeshBounds}
        scrollWheelZoom={true}
        className="w-full h-[400px] rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {targetLocation && (
          <FlyToLocation lat={targetLocation.lat} lng={targetLocation.lng} />
        )}

        {filteredCenters.map((center, index) => (
          <Marker
            key={index}
            position={[center.latitude, center.longitude]}
            ref={index === 0 ? popupRef : null} // only first match gets ref
          >
            <Popup>
              <div>
                <h3 className="font-bold">{center.city}, {center.district}</h3>
                <p><strong>Region:</strong> {center.region}</p>
                <p><strong>Covered Areas:</strong> {center.covered_area.join(', ')}</p>
                <img
                  src={center.flowchart}
                  alt={`${center.city} flowchart`}
                  className="mt-2 rounded"
                  style={{ width: '100%', maxWidth: '200px' }}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
