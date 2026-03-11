import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import startups from "../data/startups";
import MapView from "../components/mapview";
import Sidebar from "../components/sidebar";
import CompanyPanel from "../components/CompanyPanel";

function DashboardPage() {
  const [selected, setSelected] = useState(null);
  const location = useLocation();

  const mapConfig = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");

    switch(city?.toLowerCase()) {
      case "bangalore": return { center: [12.9716, 77.5946], zoom: 12 };
      case "delhi": return { center: [28.4595, 77.0266], zoom: 11 }; // NCR area
      case "hyderabad": return { center: [17.4436, 78.3496], zoom: 12 }; // Tech area
      default: return { center: [12.9716, 77.5946], zoom: 12 }; // Default to Bangalore (matches reference site)
    }
  }, [location.search]);

  return (
    <div className="flex h-screen w-full bg-[#0a0a0a] overflow-hidden text-[#E0E0E0]">
      <Sidebar startups={startups} onSelect={setSelected} selected={selected} />
      
      <MapView startups={startups} onSelect={setSelected} center={mapConfig.center} zoom={mapConfig.zoom} />

      {selected && (
        <CompanyPanel company={selected} close={() => setSelected(null)} />
      )}
    </div>
  );
}

export default DashboardPage;
