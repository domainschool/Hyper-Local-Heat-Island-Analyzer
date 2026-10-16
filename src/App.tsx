import React, { useState, useMemo } from 'react';
import { CITY_BASELINES, TRACTS_DATA } from './data/tracts';
import { CityBaseline, MapLayerMode, TractData } from './types';
import { calculateCanopySimulation } from './utils/remoteSensing';
import { Header } from './components/Header';
import { ParchmentMap } from './components/Map/ParchmentMap';
import { TractDetailCard } from './components/Metrics/TractDetailCard';
import { ScatterRegressionChart } from './components/Analytics/ScatterRegressionChart';
import { DiurnalRetentionChart } from './components/Analytics/DiurnalRetentionChart';
import { GrantDossierModal } from './components/Dossier/GrantDossierModal';
import { AboutPage } from './components/About/AboutPage';
import { Map, BarChart2, ListFilter, BookOpen } from 'lucide-react';

export const App: React.FC = () => {
  // City & Tract selection state
  const [selectedCityId, setSelectedCityId] = useState<string>('nyc');
  const [selectedTractId, setSelectedTractId] = useState<string>('nyc-tract-27');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layerMode, setLayerMode] = useState<MapLayerMode>('thermal');
  const [addedCanopyPct, setAddedCanopyPct] = useState<number>(0);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'map' | 'analytics' | 'catalog' | 'about'>('map');

  const currentCityBaseline: CityBaseline = CITY_BASELINES[selectedCityId] || CITY_BASELINES.nyc;
  const currentCityTracts: TractData[] = TRACTS_DATA[selectedCityId] || TRACTS_DATA.nyc;

  // When city changes, reset selected tract to first tract of that city and reset slider
  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    const newTracts = TRACTS_DATA[cityId] || [];
    if (newTracts.length > 0) {
      setSelectedTractId(newTracts[0].id);
    }
    setAddedCanopyPct(0);
  };

  // Find currently active tract
  const selectedTract: TractData = useMemo(() => {
    const found = currentCityTracts.find((t) => t.id === selectedTractId);
    return found || currentCityTracts[0];
  }, [currentCityTracts, selectedTractId]);

  // Compute live simulation state
  const simulation = useMemo(() => {
    return calculateCanopySimulation(selectedTract, addedCanopyPct);
  }, [selectedTract, addedCanopyPct]);

  // Filter tracts based on search query
  const filteredTracts = useMemo(() => {
    if (!searchQuery.trim()) return currentCityTracts;
    const query = searchQuery.toLowerCase().trim();
    return currentCityTracts.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.fipsCode.includes(query) ||
        t.zipCode.includes(query) ||
        t.boroughOrDistrict.toLowerCase().includes(query)
    );
  }, [currentCityTracts, searchQuery]);

  // Handle direct tract click
  const handleSelectTract = (tract: TractData) => {
    setSelectedTractId(tract.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink-primary">
      
      {/* Top Editorial Navigation */}
      <Header
        selectedCityId={selectedCityId}
        onSelectCity={handleSelectCity}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenDossier={() => setIsDossierOpen(true)}
        onOpenAbout={() => setActiveTab('about')}
        currentBaseline={currentCityBaseline}
      />

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Navigation Tabs (Map View vs. Spatial Analytics vs. Full Catalog vs. About) */}
        <div className="flex items-center justify-between flex-wrap gap-3 border-b border-hairline pb-3">
          <div className="flex items-center bg-card p-1 rounded-2xl border border-hairline flex-wrap gap-1">
            <button
              onClick={() => setActiveTab('map')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeTab === 'map'
                  ? 'bg-card-floating text-ink-primary shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Interactive Cartography</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeTab === 'analytics'
                  ? 'bg-card-floating text-ink-primary shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>Statistical Analytics</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeTab === 'catalog'
                  ? 'bg-card-floating text-ink-primary shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Tract Directory ({filteredTracts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all ${
                activeTab === 'about'
                  ? 'bg-canopy-deep text-canvas shadow-sm font-semibold'
                  : 'text-ink-secondary hover:text-ink-primary'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>About & Learning Guide</span>
            </button>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-2 text-xs text-ink-muted">
            <span className="font-serif italic">Displaying:</span>
            <span className="font-semibold text-ink-primary">{currentCityBaseline.regionLabel}</span>
            <span>•</span>
            <span className="font-mono-numbers">
              {currentCityTracts.length} Census Tracts Loaded
            </span>
          </div>
        </div>

        {/* Main View: About Page vs. Dual-Pane Spatial Workspace */}
        {activeTab === 'about' ? (
          <AboutPage onSwitchTab={setActiveTab} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column (8 cols): Map or Tabbed View */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {activeTab === 'map' && (
              <div className="space-y-4">
                {/* Parchment Leaflet Map */}
                <ParchmentMap
                  city={currentCityBaseline}
                  tracts={filteredTracts}
                  selectedTractId={selectedTract.id}
                  onSelectTract={handleSelectTract}
                  layerMode={layerMode}
                  onLayerModeChange={setLayerMode}
                />

                {/* Quick Tract Scroller Ribbon Below Map */}
                <div className="bg-card rounded-2xl p-3 border border-hairline space-y-2">
                  <div className="text-[11px] font-medium text-ink-muted uppercase tracking-wider px-1">
                    Select Tract Corridor:
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {filteredTracts.map((t) => {
                      const isSel = t.id === selectedTract.id;
                      const isHighHeat = t.cityBaselineDelta >= 8;
                      return (
                        <button
                          key={t.id}
                          onClick={() => handleSelectTract(t)}
                          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all border flex-shrink-0 ${
                            isSel
                              ? 'bg-card-floating border-ink-primary text-ink-primary shadow-sm font-semibold'
                              : 'bg-card-subtle/60 border-hairline text-ink-secondary hover:bg-card-floating'
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full ${
                              isHighHeat ? 'bg-heat-terracotta' : t.canopyCoverPct > 25 ? 'bg-canopy-deep' : 'bg-heat-amber'
                            }`}
                          />
                          <span>{t.name.split('—')[0].trim()}</span>
                          <span className="font-mono-numbers text-[11px] text-ink-muted">
                            {t.avgLST_F}°F
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Compact Analytics Preview Under Map */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <ScatterRegressionChart
                    tracts={currentCityTracts}
                    selectedTractId={selectedTract.id}
                    onSelectTract={handleSelectTract}
                  />
                  <DiurnalRetentionChart tract={selectedTract} />
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <ScatterRegressionChart
                    tracts={currentCityTracts}
                    selectedTractId={selectedTract.id}
                    onSelectTract={handleSelectTract}
                  />
                  <DiurnalRetentionChart tract={selectedTract} />
                </div>
              </div>
            )}

            {activeTab === 'catalog' && (
              <div className="bg-card rounded-3xl p-5 border border-hairline shadow-editorial space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-lg font-normal text-ink-primary">
                    Census Tract Microclimate Directory
                  </h3>
                  <span className="text-xs text-ink-muted font-mono-numbers">
                    {filteredTracts.length} Tracts
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-hairline">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-card-subtle font-serif font-medium text-ink-secondary border-b border-hairline">
                      <tr>
                        <th className="py-2.5 px-3">Tract Name</th>
                        <th className="py-2.5 px-3">FIPS / Zip</th>
                        <th className="py-2.5 px-3">Surface LST</th>
                        <th className="py-2.5 px-3">Canopy %</th>
                        <th className="py-2.5 px-3">Poverty %</th>
                        <th className="py-2.5 px-3">Redlining</th>
                        <th className="py-2.5 px-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline">
                      {filteredTracts.map((t) => {
                        const isSel = t.id === selectedTract.id;
                        return (
                          <tr
                            key={t.id}
                            className={`transition-colors cursor-pointer ${
                              isSel ? 'bg-canopy-tint/40 font-medium' : 'hover:bg-card-subtle/50'
                            }`}
                            onClick={() => handleSelectTract(t)}
                          >
                            <td className="py-2.5 px-3 text-ink-primary font-medium">{t.name}</td>
                            <td className="py-2.5 px-3 font-mono-numbers text-ink-muted">
                              {t.fipsCode} ({t.zipCode})
                            </td>
                            <td className="py-2.5 px-3 font-mono-numbers font-semibold text-heat-terracotta">
                              {t.avgLST_F}°F (+{t.cityBaselineDelta.toFixed(1)}°)
                            </td>
                            <td className="py-2.5 px-3 font-mono-numbers font-semibold text-canopy-deep">
                              {t.canopyCoverPct.toFixed(1)}%
                            </td>
                            <td className="py-2.5 px-3 font-mono-numbers">{t.povertyPct}%</td>
                            <td className="py-2.5 px-3">{t.historicRedliningClass.split(' ')[0]}</td>
                            <td className="py-2.5 px-3 text-right">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectTract(t);
                                  setActiveTab('map');
                                }}
                                className="px-2 py-1 rounded-lg bg-card-subtle text-ink-primary hover:bg-card-floating transition-all text-[11px]"
                              >
                                View on Map
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Right Column (4-5 cols): Active Tract Detail & Simulation Card */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-20">
            <TractDetailCard
              tract={selectedTract}
              simulation={simulation}
              onCanopyChange={setAddedCanopyPct}
              onOpenDossier={() => setIsDossierOpen(true)}
            />
          </div>
        </div>
      )}

      </main>

      {/* Audit-Ready Justice40 Grant Brief Modal */}
      <GrantDossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        tract={selectedTract}
        simulation={simulation}
        city={currentCityBaseline}
      />

    </div>
  );
};

export default App;
