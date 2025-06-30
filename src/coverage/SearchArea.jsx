import React, { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Leaflet marker icon fix
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// Dummy data (replace with props or loader if needed)
const mockServiceCenters = [
  {
    city: "Mirpur",
    district: "Dhaka",
    region: "Central",
    covered_area: ["Dhanmondi", "Uttara", "Gulshan"],
    latitude: 23.8041,
    longitude: 90.4152,
    flowchart: "https://via.placeholder.com/150",
  },
  {
    city: "Chittagong Port",
    district: "Chattogram",
    region: "South-East",
    covered_area: ["Pahartali", "Agrabad"],
    latitude: 22.335,
    longitude: 91.832,
    flowchart: "https://via.placeholder.com/150",
  },
  {
    city: "Khulna Sadar",
    district: "Khulna",
    region: "South-West",
    covered_area: ["Sonadanga", "Batiaghata"],
    latitude: 22.8456,
    longitude: 89.5403,
    flowchart: "https://via.placeholder.com/150",
  },
];

const FlyToResult = ({ results }) => {
  const map = useMap();
  useEffect(() => {
    if (results.length > 0) {
      const { latitude, longitude } = results[0];
      map.flyTo([latitude, longitude], 9);
    }
  }, [results, map]);
  return null;
};

const SearhArea = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredCenters, setFilteredCenters] = useState(mockServiceCenters);

  const handleSearch = () => {
    const input = searchText.trim().toLowerCase();
    const results = mockServiceCenters.filter((center) =>
      center.district.toLowerCase().includes(input)
    );
    setFilteredCenters(results.length ? results : []);
  };

  return (
    <div className="w-[800px] mx-auto my-6 space-y-6">
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter district name (e.g. Dhaka)"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {/* Map with Zoom Effect */}
      <MapContainer
        bounds={[
          [20.5, 88.0],
          [26.7, 92.7],
        ]}
        scrollWheelZoom={false}
        className="w-full h-[400px] rounded-lg"
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        <FlyToResult results={filteredCenters} />

        {filteredCenters.map((center, index) => (
          <Marker key={index} position={[center.latitude, center.longitude]}>
            <Popup>
              <div>
                <h3 className="font-bold">
                  {center.city}, {center.district}
                </h3>
                <p>
                  <strong>Region:</strong> {center.region}
                </p>
                <p>
                  <strong>Covered Areas:</strong>{" "}
                  {center.covered_area.join(", ")}
                </p>
                <img
                  src={center.flowchart}
                  alt={`${center.city} flowchart`}
                  className="mt-2 rounded"
                  style={{ width: "100%", maxWidth: "200px" }}
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Result Summary */}
      {filteredCenters.length === 0 && searchText && (
        <p className="text-center text-red-500 font-medium">
          No matching service centers found.
        </p>
      )}

      {filteredCenters.length > 0 && (
        <ul className="space-y-3">
          {filteredCenters.map((center, idx) => (
            <li key={idx} className="bg-gray-50 p-3 rounded border">
              <strong>📍 {center.city}, {center.district}</strong> —{" "}
              Covered: {center.covered_area.join(", ")}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchCoverageMap;
