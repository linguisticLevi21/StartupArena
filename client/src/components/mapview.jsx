import { MapContainer, TileLayer, Marker, ZoomControl, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Creates a clean app-icon style marker using the company's Clearbit logo
const createLogoIcon = (domain, name) => {
  const logoUrl = `https://logo.clearbit.com/${domain}`;
  const initial = name ? name.charAt(0).toUpperCase() : "?";

  return new L.DivIcon({
    className: "leaflet-logo-icon",
    html: `
      <div
        style="
          width: 36px;
          height: 36px;
          border-radius: 10px;
          overflow: hidden;
          background: #1a1a1a;
          border: 1.5px solid rgba(255,255,255,0.15);
          box-shadow: 0 2px 12px rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        "
        title="${name}"
        onmouseover="this.style.transform='scale(1.2)';this.style.borderColor='rgba(255,255,255,0.6)'"
        onmouseout="this.style.transform='scale(1)';this.style.borderColor='rgba(255,255,255,0.15)'"
      >
        <img
          src="${logoUrl}"
          alt="${name}"
          style="width:28px;height:28px;object-fit:contain;border-radius:6px;"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';"
        />
        <span
          style="
            display:none;
            width:28px;height:28px;border-radius:6px;
            background: linear-gradient(135deg, #4f46e5, #7c3aed);
            color:white;font-size:14px;font-weight:700;
            align-items:center;justify-content:center;
          "
        >
          ${initial}
        </span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

// Smoothly flies the map to the new center/zoom when props change
function MapController({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, zoom, { duration: 1.5 });
    }
  }, [center, zoom, map]);
  return null;
}

function MapView({ startups, onSelect, center, zoom }) {
  return (
    <div style={{ flex: 1, height: "100vh", position: "relative", background: "#0a0a0a" }}>
      <MapContainer
        center={center || [12.9716, 77.5946]}
        zoom={zoom || 12}
        zoomControl={false}
        style={{ height: "100%", width: "100%", background: "#000" }}
      >
        <MapController center={center || [12.9716, 77.5946]} zoom={zoom || 12} />
        <ZoomControl position="bottomright" />

        {/* Dark CartoDB tiles — same as reference site */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {/* Render one marker per startup using its Clearbit logo */}
        {startups?.map((s) => (
          <Marker
            key={s.id}
            position={[s.lat, s.lng]}
            icon={createLogoIcon(s.domain, s.name)}
            eventHandlers={{
              click: () => onSelect(s),
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
