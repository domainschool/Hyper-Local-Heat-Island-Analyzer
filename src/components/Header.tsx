import React from 'react';
import { CityBaseline } from '../types';
import { CITY_BASELINES } from '../data/tracts';
import { Trees, Satellite, FileText, Search, ShieldCheck, BookOpen } from 'lucide-react';

interface HeaderProps {
  selectedCityId: string;
  onSelectCity: (cityId: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenDossier: () => void;
  onOpenAbout: () => void;
  currentBaseline: CityBaseline;
}

export const Header: React.FC<HeaderProps> = ({
  selectedCityId,
  onSelectCity,
  searchQuery,
  onSearchChange,
  onOpenDossier,
  onOpenAbout,
  currentBaseline,
}) => {
  return (
    <header className="w-full bg-card/80 backdrop-blur-md border-b border-hairline sticky top-0 z-40 transition-all duration-200">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Brand & Editorial Title */}
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-canopy-deep text-canopy-tint flex items-center justify-center shadow-editorial flex-shrink-0">
              <Trees className="w-5 h-5 text-canopy-tint" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-serif text-xl sm:text-2xl font-normal text-ink-primary tracking-tight">
                  The Urban Canopy Report
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-canopy-tint text-canopy-deep">
                  <ShieldCheck className="w-3 h-3" />
                  SDG 11
                </span>
              </div>
              <p className="text-xs text-ink-secondary mt-0.5 flex items-center gap-2 flex-wrap">
                <span className="font-serif italic">Editorial Climate Intelligence</span>
                <span className="text-ink-muted">•</span>
                <span className="text-ink-muted">
                  Baseline: {currentBaseline.cityName} July ’24 ({currentBaseline.baselineLST_F}°F LST)
                </span>
              </p>
            </div>
          </div>

          {/* Search, City Switcher & Export CTA */}
          <div className="flex items-center gap-2.5 flex-wrap">
            
            {/* City Selector */}
            <div className="flex items-center bg-card-subtle p-1 rounded-2xl border border-hairline">
              {Object.values(CITY_BASELINES).map((city) => (
                <button
                  key={city.id}
                  onClick={() => onSelectCity(city.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all ${
                    selectedCityId === city.id
                      ? 'bg-card-floating text-ink-primary shadow-sm font-semibold'
                      : 'text-ink-secondary hover:text-ink-primary'
                  }`}
                >
                  {city.cityName}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[200px] sm:min-w-[240px]">
              <Search className="w-4 h-4 text-ink-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search Tract, Neighborhood or Zip..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-card-subtle text-ink-primary placeholder:text-ink-muted rounded-2xl border border-hairline focus:outline-none focus:ring-1 focus:ring-canopy-sage focus:bg-card-floating transition-all"
              />
            </div>

            {/* Satellite Metadata Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-card-subtle/80 border border-hairline text-xs text-ink-muted">
              <Satellite className="w-3.5 h-3.5 text-ink-secondary" />
              <span className="font-mono-numbers text-[11px]">{currentBaseline.satelliteSensor.split(' ')[1]}</span>
            </div>

            {/* Educational Guide CTA */}
            <button
              onClick={onOpenAbout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-card text-ink-primary text-xs font-medium border border-hairline hover:bg-card-floating active:scale-[0.98] transition-all shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-canopy-sage" />
              <span>About & Guide</span>
            </button>

            {/* Primary Action: Export Grant Dossier */}
            <button
              onClick={onOpenDossier}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-canopy-deep text-canvas text-xs font-medium hover:bg-canopy-deep/90 active:scale-[0.98] transition-all shadow-editorial"
            >
              <FileText className="w-4 h-4 text-canopy-tint" />
              <span>Justice40 Grant Brief</span>
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
