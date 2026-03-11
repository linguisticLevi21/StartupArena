import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoveRight, Map, BriefcaseBusiness, Globe, Building2, UserCircle2 } from "lucide-react";
import LoginModal from "../components/loginmodal";

function LandingPage() {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);

  const handleCitySelect = (city) => {
    navigate(`/dashboard?city=${city}`);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-500/[0.05] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Auth Navigation */}
      <div className="absolute top-6 right-8 z-[100]">
        <button 
          onClick={() => setShowLogin(true)}
          className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full font-medium transition-all flex items-center gap-2 text-sm"
        >
          <UserCircle2 className="w-4 h-4" />
          <span>Login / Signup</span>
        </button>
      </div>

      <main className="z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto space-y-10 py-20 w-full">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-sm text-gray-300 mb-2 transition-transform hover:scale-105 cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]" />
          <span className="tracking-wide text-xs font-medium uppercase">Live Map Data</span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 pb-2">
          JOB ARENA
        </h1>
        
        <p className="text-xl md:text-3xl text-gray-400 max-w-3xl font-light leading-snug">
          The most direct way to discover startup roles across India's premier tech hubs.
        </p>

        {/* City Selection Cards with AI Generated Icons */}
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 mb-8">
          {[
            { id: 'bangalore', name: 'Bangalore', iconSrc: '/bangalore.png', roles: '150+', extra: 'Silicon Valley of India' },
            { id: 'delhi', name: 'Delhi NCR', iconSrc: '/delhi.png', roles: '85+', extra: 'Capital Tech Hub' },
            { id: 'hyderabad', name: 'Hyderabad', iconSrc: '/hyderabad.png', roles: '60+', extra: 'Cyberabad District' }
          ].map((city) => (
            <button
              key={city.id}
              onClick={() => handleCitySelect(city.id)}
              className="group relative h-56 rounded-3xl overflow-hidden border border-white/10 bg-[#111111]/80 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/30 text-left flex flex-col justify-between p-6 shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent z-0" />
              
              {/* Image Icon */}
              <div className="absolute right-0 top-0 w-32 h-32 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500 mix-blend-screen pointer-events-none" style={{ backgroundImage: `url(${city.iconSrc})`, backgroundSize: 'cover', backgroundPosition: 'center', maskImage: 'linear-gradient(to bottom left, black, transparent)' }} />

              <div className="relative z-10 flex justify-between items-start mt-2">
                <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg border border-white/10 group-hover:border-white/30 transition-colors">
                  <img src={city.iconSrc} alt={city.name} className="w-full h-full object-cover" />
                </div>
                <div className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                  <MoveRight className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{city.name}</h3>
                <p className="text-gray-400 text-xs mb-3">{city.extra}</p>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs text-gray-300 font-medium flex items-center gap-1.5">
                    <BriefcaseBusiness className="w-3.5 h-3.5" /> 
                    {city.roles} Open Roles
                  </span>
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
          className="group relative px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white font-medium rounded-2xl overflow-hidden transition-all hover:bg-white hover:text-black hover:scale-105 active:scale-95 flex items-center gap-3 mt-4 focus:ring-4 focus:ring-white/20"
        >
          <Globe className="w-5 h-5 group-hover:animate-spin" style={{ animationIterationCount: 1, animationDuration: '1s' }} />
          <span>View All Locations</span>
        </button>
      </main>

      {/* Login Modal Overlay */}
      {showLogin && (
        <LoginModal close={() => setShowLogin(false)} />
      )}

      <footer className="absolute bottom-6 text-sm text-gray-600 flex items-center gap-8 font-medium">
        <button onClick={() => setShowLogin(true)} className="hover:text-gray-300 transition-colors">Submit Company</button>
        <button onClick={() => setShowLogin(true)} className="hover:text-gray-300 transition-colors">Advertise</button>
        <span>•</span>
        <span className="text-gray-500">© 2026 Job Arena</span>
      </footer>
    </div>
  );
}

export default LandingPage;
