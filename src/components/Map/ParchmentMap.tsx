import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from 'react-leaflet';
import { CityBaseline, MapLayerMode, TractData } from '../../types';
import { getThermalColor, getCanopyColor } from '../../utils/remoteSensing';
import { Flame, Trees, Layers, MapPin } from 'lucide-react';

interface ParchmentMapProps {
  city: CityBaseline;
  tracts: TractData[];
  selectedTractId: string;
  onSelectTract: (tract: TractData) => void;
  layerMode: MapLayerMode;
  onLayerModeChange: (mode: MapLayerMode) => void;
}

// Subcomponent to smoothly pan and zoom when city changes
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 0.8 });
  }, [center, zoom, map]);
  return null;
};

export const ParchmentMap: React.FC<ParchmentMapProps> = ({
  city,
  tracts,
  selectedTractId,
  onSelectTract,
  layerMode,
  onLayerModeChange,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[640px] rounded-3xl overflow-hidden border border-hairline shadow-editorial bg-canvas">
      
      {/* Layer Mode Switcher Floating Bar */}
      <div className="absolute top-4 left-4 z-[500] flex items-center bg-card-floating/95 backdrop-blur-md p-1 rounded-2xl border border-hairline shadow-floating">
        <button
          onClick={() => onLayerModeChange('thermal')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            layerMode === 'thermal'
              ? 'bg-heat-terracotta text-canvas shadow-sm font-semibold'
              : 'text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>Thermal LST</span>
        </button>

        <button
          onClick={() => onLayerModeChange('canopy')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            layerMode === 'canopy'
              ? 'bg-canopy-deep text-canvas shadow-sm font-semibold'
              : 'text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Trees className="w-3.5 h-3.5" />
          <span>Tree Canopy</span>
        </button>

        <button
          onClick={() => onLayerModeChange('bivariate')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
            layerMode === 'bivariate'
              ? 'bg-ink-primary text-canvas shadow-sm font-semibold'
              : 'text-ink-secondary hover:text-ink-primary'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Bivariate Disparity</span>
        </button>
      </div>

      {/* Map Metadata Chip */}
      <div className="absolute top-4 right-4 z-[500] hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-card-floating/90 backdrop-blur-md border border-hairline shadow-sm text-xs text-ink-muted">
        <MapPin className="w-3.5 h-3.5 text-canopy-accent" />
        <span>{city.regionLabel}</span>
      </div>

      {/* Leaflet Map Container */}
      <MapContainer
        center={city.center}
        zoom={city.zoom}
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ width: '100%', height: '100%' }}
      >
        <MapRecenter center={city.center} zoom={city.zoom} />

        {/* Warm Parchment CartoDB Positron Base Tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Tract Polygons */}
        {tracts.map((tract) => {
          const isSelected = tract.id === selectedTractId;
          
          // Determine fill color based on layer mode
          let fillColor = '#8C827A';
          let fillOpacity = 0.65;
          let strokeColor = '#221F1D';
          let strokeWidth = 1.2;

          if (layerMode === 'thermal') {
            fillColor = getThermalColor(tract.cityBaselineDelta);
            fillOpacity = isSelected ? 0.85 : 0.65;
          } else if (layerMode === 'canopy') {
            fillColor = getCanopyColor(tract.canopyCoverPct);
            fillOpacity = isSelected ? 0.85 : 0.65;
          } else if (layerMode === 'bivariate') {
            const isCritical = tract.avgLST_F > 95 && tract.canopyCoverPct < 15;
            if (isCritical) {
              fillColor = '#B84A39';
              fillOpacity = 0.85;
              strokeColor = '#571D14';
              strokeWidth = 2;
            } else if (tract.canopyCoverPct >= 30) {
              fillColor = '#2D4739';
              fillOpacity = 0.75;
            } else {
              fillColor = '#EAB365';
              fillOpacity = 0.55;
            }
          }

          if (isSelected) {
            strokeColor = '#221F1D';
            strokeWidth = 3;
          }

          return (
            <Polygon
              key={tract.id}
              positions={tract.boundary}
              pathOptions={{
                fillColor,
                fillOpacity,
                color: strokeColor,
                weight: strokeWidth,
                dashArray: isSelected ? '4, 4' : undefined,
              }}
              eventHandlers={{
                click: () => onSelectTract(tract),
              }}
            >
              <Tooltip sticky direction="top" opacity={0.96}>
                <div className="p-2 font-sans text-xs space-y-1.5 max-w-[220px]">
                  <div className="font-serif text-sm font-medium text-ink-primary border-b border-hairline pb-1">
                    {tract.name}
                  </div>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 font-mono-numbers text-[11px]">
                    <span className="text-ink-muted">Surface LST:</span>
                    <span className="font-semibold text-heat-terracotta text-right">
                      {tract.avgLST_F}°F ({tract.cityBaselineDelta >= 0 ? `+${tract.cityBaselineDelta}` : tract.cityBaselineDelta}°)
                    </span>
                    <span className="text-ink-muted">Canopy Cover:</span>
                    <span className="font-semibold text-canopy-deep text-right">
                      {tract.canopyCoverPct}%
                    </span>
                    <span className="text-ink-muted">Poverty Rate:</span>
                    <span className="text-ink-secondary text-right">{tract.povertyPct}%</span>
                    <span className="text-ink-muted">Redlining:</span>
                    <span className="text-ink-secondary text-right">{tract.historicRedliningClass.split(' ')[0]}</span>
                  </div>
                </div>
              </Tooltip>
            </Polygon>
          );
        })}
      </MapContainer>

      {/* Cartographic Legend (Canopy & Clay Palette) */}
      <div className="absolute bottom-4 left-4 z-[500] bg-card-floating/95 backdrop-blur-md p-3 rounded-2xl border border-hairline shadow-editorial max-w-[280px]">
        <div className="text-[11px] font-medium text-ink-primary uppercase tracking-wider mb-2">
          {layerMode === 'thermal' && 'Land Surface Temperature (°F)'}
          {layerMode === 'canopy' && 'Tree Canopy Cover (%)'}
          {layerMode === 'bivariate' && 'Bivariate Climate Risk Tier'}
        </div>

        {layerMode === 'thermal' && (
          <div className="space-y-1.5">
            <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#EAB365] via-[#D97746] to-[#B84A39]" />
            <div className="flex justify-between text-[10px] font-mono-numbers text-ink-muted">
              <span>Baseline ({city.baselineLST_F}°F)</span>
              <span>+6°F Anomaly</span>
              <span>+12°F Severe</span>
            </div>
          </div>
        )}

        {layerMode === 'canopy' && (
          <div className="space-y-1.5">
            <div className="h-2.5 w-full rounded-full bg-gradient-to-r from-[#D2DDD4] via-[#5B7563] to-[#2D4739]" />
            <div className="flex justify-between text-[10px] font-mono-numbers text-ink-muted">
              <span>&lt;10% Deficit</span>
              <span>20% Moderate</span>
              <span>&gt;30% Benchmark</span>
            </div>
          </div>
        )}

        {layerMode === 'bivariate' && (
          <div className="flex items-center gap-2 text-[11px]">
            <span className="flex items-center gap-1 text-heat-terracotta font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-heat-terracotta inline-block" />
              Critical Heat Burden
            </span>
            <span className="text-ink-muted">•</span>
            <span className="flex items-center gap-1 text-canopy-deep font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-canopy-deep inline-block" />
              Canopy Buffer
            </span>
          </div>
        )}
      </div>

    </div>
  );
};
