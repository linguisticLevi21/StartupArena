import { useNavigate } from "react-router-dom";
import { MoveRight, Map, BriefcaseBusiness, Globe } from "lucide-react";

function LandingPage() {
  const navigate = useNavigate();

  const handleCitySelect = (city) => {
    navigate(`/dashboard?city=${city}`);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      <main className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto space-y-10 py-20 w-full">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300 mb-2 transition-transform hover:scale-105 cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          <span className="tracking-wide text-xs font-medium uppercase">Live Map Data</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 pb-2">
          STARTUP ARENA
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-400 max-w-3xl font-light leading-snug">
          The most direct way to discover startup roles across India's premier tech hubs.
        </p>

        {/* City Selection Cards */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8 perspective-1000">
          {[
            { id: 'bangalore', name: 'Bangalore', roles: '150+', image: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=800&auto=format&fit=crop")' },
            { id: 'delhi', name: 'Delhi NCR', roles: '85+', image: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=800&auto=format&fit=crop")' },
            { id: 'hyderabad', name: 'Hyderabad', roles: '60+', image: 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.8)), url("https://images.unsplash.com/photo-1600024479434-d13ba0416b08?q=80&w=800&auto=format&fit=crop")' }
          ].map((city) => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className="group relative h-48 rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 hover:scale-105 hover:border-white/30 text-left flex flex-col justify-end p-6"
              style={{ backgroundImage: city.image, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="relative z-10 transform transition-transform duration-500 group-hover:-translate-y-2">
                <h3 className="text-2xl font-bold text-white mb-1">{city.name}</h3>
                <p className="text-gray-300 text-sm flex items-center gap-2">
                  <BriefcaseBusiness className="w-4 h-4" /> {city.roles} Open Roles
                </p>
              </div>
              <div className="absolute bottom-6 right-6 opacity-0 transform translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
                  <MoveRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4 flex items-center gap-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent to-white/20" />
          <span className="text-gray-500 text-sm uppercase tracking-widest font-semibold">Or explore globally</span>
          <div className="h-[1px] w-24 bg-gradient-to-l from-transparent to-white/20" />
        </div>

        <button 
          onClick={() => navigate("/dashboard")}
          className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium rounded-2xl overflow-hidden transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 flex items-center gap-3 mt-4"
        >
          <Globe className="w-5 h-5" />
          <span>View All Locations</span>
        </button>
      </main>

      <footer className="absolute bottom-6 text-sm text-gray-600 flex items-center gap-8 font-medium">
        <a href="#" className="hover:text-gray-300 transition-colors">Submit Company</a>
        <a href="#" className="hover:text-gray-300 transition-colors">Advertise</a>
        <span>•</span>
        <span className="text-gray-500">© 2026 Startup Arena</span>
      </footer>
    </div>
  );
}

export default LandingPage;
