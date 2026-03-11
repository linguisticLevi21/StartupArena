import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Function to generate dynamic icon with logo
const createCustomIcon = (logoUrl, name) => {
  return new L.DivIcon({
    className: "custom-marker bg-transparent border-none",
    html: `
      <div class="relative group cursor-pointer w-8 h-8 rounded-xl overflow-hidden bg-[#111111] border border-white/20 shadow-lg hover:border-white/80 hover:scale-110 transition-all duration-300 flex items-center justify-center p-1" title="${name}">
        <img src="${logoUrl}" alt="${name}" class="w-full h-full object-contain rounded-[6px]" onerror="this.src='https://ui-avatars.com/api/?name=${name[0]}&background=random'" />
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16] // Center the marker over the coordinate
  });
};

function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

function MapView({ startups, onSelect, center, zoom }) {
  // Allow the panel to open on select
  const handleMarkerClick = (s) => {
    onSelect(s); 
  };

  return (
    <div className="flex-1 h-screen relative bg-[#0a0a0a] z-0">
      <MapContainer
        center={center || [12.9352, 77.6245]}
        zoom={zoom || 12}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#000000" }}
      >
        <MapController center={center || [12.9352, 77.6245]} zoom={zoom || 12} />
        <ZoomControl position="bottomright" />
        {/* Dark mode sleek tiles from CartoDB */}
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {startups?.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={createCustomIcon(s.logo, s.name)}
            eventHandlers={{
              click: () => handleMarkerClick(s),
            }}
          />
        ))}
      </MapContainer>
      
      {/* Subtle overlay gradient to blend map edges with UI */}
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black/20 to-transparent pointer-events-none z-[400]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/50 to-transparent pointer-events-none z-[400]" />
    </div>
  );
}

export default MapView;
