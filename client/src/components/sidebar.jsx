import { useState } from "react";
import { Search } from "lucide-react";
import CompanyLogo from "./CompanyLogo";

function Sidebar({ startups, onSelect, selected }) {
  const [query, setQuery] = useState("");

  const filtered = startups?.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    (s.city && s.city.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="w-[360px] h-full bg-[#0a0a0a]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col z-[500] shadow-2xl shrink-0">

      {/* Header */}
      <div className="p-5 border-b border-white/10 shrink-0">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-lg font-bold text-white">Startups</h2>
          <span className="text-xs text-gray-500 font-medium">
            {filtered?.length || 0} companies
          </span>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search companies or cities..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-200 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-colors placeholder:text-gray-600"
          />
        </div>
      </div>

      {/* Company list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
        {filtered?.map((s) => {
          const isSelected = selected?.id === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onSelect(s)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 border flex items-center gap-3 group ${
                isSelected
                  ? "bg-white/10 border-white/20 shadow-md"
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-white/10"
              }`}
            >
              {/* Real logo via Clearbit — falls back to initial badge */}
              <CompanyLogo domain={s.domain} name={s.name} size={38} />

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className={`font-semibold text-sm truncate ${isSelected ? "text-white" : "text-gray-200 group-hover:text-white"}`}>
                  {s.name}
                </p>
                <p className="text-xs text-gray-500 truncate mt-0.5">
                  {s.roles?.length || 0} open roles · {s.city}
                </p>
              </div>
            </button>
          );
        })}

        {filtered?.length === 0 && (
          <div className="text-center py-12 text-gray-600 text-sm">
            No companies found for "{query}"
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
