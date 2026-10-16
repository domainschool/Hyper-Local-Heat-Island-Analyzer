import React from 'react';
import { SimulationState, TractData } from '../../types';
import { ThermalDisparityGauge } from './ThermalDisparityGauge';
import { CoolingHorizonSlider } from '../Simulation/CoolingHorizonSlider';
import { AlertTriangle, ShieldAlert, FileSpreadsheet } from 'lucide-react';

interface TractDetailCardProps {
  tract: TractData;
  simulation: SimulationState;
  onCanopyChange: (addedPct: number) => void;
  onOpenDossier: () => void;
}

export const TractDetailCard: React.FC<TractDetailCardProps> = ({
  tract,
  simulation,
  onCanopyChange,
  onOpenDossier,
}) => {
  const isCriticalZone = tract.avgLST_F > 95.0 && tract.canopyCoverPct < 15.0;

  return (
    <div className="w-full bg-card rounded-3xl p-5 sm:p-6 border border-hairline shadow-editorial space-y-5">
      
      {/* Tract Header & Badges */}
      <div>
        <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
          <span className="text-xs font-mono-numbers text-ink-muted">
            FIPS: {tract.fipsCode} • Zip: {tract.zipCode}
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {isCriticalZone && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-heat-tint text-heat-severe border border-heat-severe/20 animate-pulse">
                <AlertTriangle className="w-3 h-3 text-heat-severe" />
                CRITICAL INTERVENTION ZONE
              </span>
            )}
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-card-subtle text-ink-secondary border border-hairline">
              <ShieldAlert className="w-3 h-3 text-heat-amber" />
              {tract.historicRedliningClass.split(' ')[0]} {tract.historicRedliningClass.split(' ')[1]}
            </span>
          </div>
        </div>

        <h2 className="font-serif text-2xl font-normal text-ink-primary tracking-tight">
          {tract.name}
        </h2>
        <p className="font-serif italic text-sm text-ink-secondary mt-0.5">
          {tract.boroughOrDistrict} — {tract.primaryLandCover}
        </p>
      </div>

      {/* Two Prominent Metric Callout Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        
        {/* Thermal Anomaly Card */}
        <div className="bg-heat-tint rounded-2xl p-4 border border-heat-terracotta/20 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-heat-terracotta font-medium mb-1">
            <span>Surface Heat Anomaly</span>
            <span className="font-mono-numbers text-[11px] uppercase tracking-wider">Peak July</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-numbers text-3xl font-bold text-heat-terracotta tracking-tight">
              {tract.cityBaselineDelta >= 0 ? `+${tract.cityBaselineDelta.toFixed(1)}` : tract.cityBaselineDelta.toFixed(1)}°F
            </span>
            <span className="text-xs text-ink-secondary">
              ({tract.avgLST_F}°F LST)
            </span>
          </div>
          <p className="text-[11px] text-heat-terracotta/80 mt-1.5 font-medium">
            {tract.cityBaselineDelta >= 10 ? 'Extreme heat disparity above city baseline' : 'Elevated thermal corridor'}
          </p>
        </div>

        {/* Canopy Cover Card */}
        <div className="bg-canopy-tint rounded-2xl p-4 border border-canopy-sage/25 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-canopy-deep font-medium mb-1">
            <span>Urban Canopy Cover</span>
            <span className="font-mono-numbers text-[11px] uppercase tracking-wider">Goal: 30%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono-numbers text-3xl font-bold text-canopy-deep tracking-tight">
              {tract.canopyCoverPct.toFixed(1)}%
            </span>
            <span className="text-xs text-canopy-accent">
              ({(tract.targetCanopyPct - tract.canopyCoverPct).toFixed(1)}% Deficit)
            </span>
          </div>
          <p className="text-[11px] text-canopy-deep/80 mt-1.5 font-medium">
            Estimated {tract.estimatedExistingTrees.toLocaleString()} trees across {tract.totalAcres} acres
          </p>
        </div>

      </div>

      {/* Signature UI Element: The Thermal Disparity Split Gauge */}
      <div className="bg-card-floating rounded-2xl p-4 border border-hairline shadow-sm">
        <ThermalDisparityGauge
          canopyPct={tract.canopyCoverPct}
          temperatureDelta={tract.cityBaselineDelta}
          targetCanopyPct={tract.targetCanopyPct}
        />
      </div>

      {/* Social Vulnerability & Equity Footprint */}
      <div className="bg-card-subtle/50 rounded-2xl p-3.5 border border-hairline">
        <div className="text-xs font-serif italic text-ink-secondary mb-2.5">
          Environmental Justice & Health Indicators:
        </div>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-card-floating rounded-xl p-2 border border-hairline">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider mb-0.5">Poverty</div>
            <div className="font-mono-numbers text-sm font-semibold text-ink-primary">{tract.povertyPct}%</div>
          </div>
          <div className="bg-card-floating rounded-xl p-2 border border-hairline">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider mb-0.5">Asthma ER</div>
            <div className="font-mono-numbers text-sm font-semibold text-heat-terracotta">{tract.asthmaHospitalizationRate}/10k</div>
          </div>
          <div className="bg-card-floating rounded-xl p-2 border border-hairline">
            <div className="text-[10px] text-ink-muted uppercase tracking-wider mb-0.5">Impervious</div>
            <div className="font-mono-numbers text-sm font-semibold text-ink-primary">{tract.imperviousSurfacePct}%</div>
          </div>
        </div>
      </div>

      {/* Signature UI Element: Cooling Horizon Simulation Slider */}
      <CoolingHorizonSlider
        tract={tract}
        simulation={simulation}
        onCanopyChange={onCanopyChange}
      />

      {/* Primary Action Button */}
      <button
        onClick={onOpenDossier}
        className="w-full py-3 px-4 rounded-2xl bg-canopy-deep text-canvas text-sm font-medium hover:bg-canopy-deep/95 active:scale-[0.99] transition-all shadow-editorial flex items-center justify-center gap-2"
      >
        <FileSpreadsheet className="w-4 h-4 text-canopy-tint" />
        <span>Generate Justice40 Grant Brief for {tract.name.split('—')[0].trim()}</span>
      </button>

    </div>
  );
};
