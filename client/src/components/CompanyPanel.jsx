import { X, ExternalLink, MapPin, Globe } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

function CompanyPanel({ company, close }) {
  if (!company) return null;

  return (
    <div className="fixed top-0 right-0 w-[420px] h-screen bg-[#111111]/98 backdrop-blur-3xl border-l border-white/10 shadow-2xl z-[1000] flex flex-col animate-slide-in">

      {/* Header: logo + name + location + close */}
      <div className="p-6 border-b border-white/10 flex items-center gap-4 shrink-0">
        <CompanyLogo domain={company.domain} name={company.name} size={52} />
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-white truncate">{company.name}</h2>
          <div className="flex items-center gap-1 text-sm text-gray-400 mt-0.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{company.office || company.city}</span>
          </div>
        </div>
        <button
          onClick={close}
          className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">

        {/* About */}
        {company.about && (
          <div>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">About</h3>
            <p className="text-gray-300 text-sm leading-relaxed">{company.about}</p>
          </div>
        )}

        {/* Visit Website */}
        {company.website && (
          <a
            href={company.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4" />
            Visit Website
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        )}

        {/* Open Roles */}
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">
            Open Roles ({company.roles?.length || 0})
          </h3>
          <div className="space-y-2">
            {company.roles?.map((r, i) => (
              <a
                key={i}
                href={r.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <div>
                  <p className="font-semibold text-gray-200 group-hover:text-white text-sm">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{r.type || "Full-time"}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors shrink-0" />
              </a>
            ))}
            {(!company.roles || company.roles.length === 0) && (
              <div className="text-center py-8 text-gray-600 text-sm">
                No open roles at the moment.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyPanel;
