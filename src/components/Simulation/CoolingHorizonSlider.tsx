import React from 'react';
import { SimulationState, TractData } from '../../types';
import { Sparkles, ArrowDownRight, TreePine, Droplets, Clock } from 'lucide-react';

interface CoolingHorizonSliderProps {
  tract: TractData;
  simulation: SimulationState;
  onCanopyChange: (addedPct: number) => void;
}

export const CoolingHorizonSlider: React.FC<CoolingHorizonSliderProps> = ({
  tract,
  simulation,
  onCanopyChange,
}) => {
  // Preset scenario shortcuts
  const presets = [
    { label: 'Pocket Groves (+5%)', value: 5 },
    { label: 'Street Trees (+12%)', value: 12 },
    { label: 'Target 30% Goal', value: Math.max(0, Math.round(30 - tract.canopyCoverPct)) },
  ];

  // Calculate percentage along the 0 to 30 range
  const fillPercentage = (simulation.addedCanopyPct / 30) * 100;

  return (
    <div className="w-full bg-card-subtle/70 rounded-3xl p-5 border border-hairline space-y-4">
      
      {/* Header and Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-canopy-deep text-canvas flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5" />
          </span>
          <div>
            <h4 className="font-serif text-base font-normal text-ink-primary">
              Cooling Horizon Simulation
            </h4>
            <p className="text-[11px] text-ink-muted">
              What-if biophysical microclimate intervention model
            </p>
          </div>
        </div>

        {/* Live Cooling Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-canopy-tint text-canopy-deep border border-canopy-sage/20 text-xs font-semibold font-mono-numbers">
          <ArrowDownRight className="w-3.5 h-3.5 text-canopy-accent" />
          <span>-{simulation.degreesCooled_F.toFixed(1)}°F Surface</span>
        </div>
      </div>

      {/* Intervention Headline */}
      <div className="flex items-baseline justify-between pt-1">
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg font-medium text-ink-primary">
            Plant +{simulation.treesToPlant.toLocaleString()} Shade Trees
          </span>
          <span className="text-xs text-canopy-accent font-medium font-mono-numbers">
            (+{simulation.addedCanopyPct.toFixed(1)}% Canopy)
          </span>
        </div>
        <span className="text-xs font-mono-numbers text-ink-muted">
          Goal: {(tract.canopyCoverPct + simulation.addedCanopyPct).toFixed(1)}% / {tract.targetCanopyPct}%
        </span>
      </div>

      {/* Custom Signature Pill-Shaped Track and Oversized Tactile Thumb */}
      <div className="relative pt-2 pb-2">
        <div className="relative h-4 w-full bg-card rounded-full overflow-hidden border border-hairline shadow-inner">
          <div 
            className="h-full rounded-full transition-all duration-150 ease-out"
            style={{
              width: `${fillPercentage}%`,
              background: 'linear-gradient(90deg, #D97746 0%, #EAB365 35%, #5B7563 70%, #2D4739 100%)'
            }}
          />
        </div>

        <input
          type="range"
          min={0}
          max={30}
          step={0.5}
          value={simulation.addedCanopyPct}
          onChange={(e) => onCanopyChange(parseFloat(e.target.value))}
          aria-label="Tree Canopy Intervention Simulator"
          className="absolute inset-0 w-full h-8 opacity-0 cursor-pointer z-20"
        />

        {/* Tactile Thumb Visual Marker */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none transition-all duration-150 z-10"
          style={{ left: `${fillPercentage}%` }}
        >
          <div className="w-7 h-7 rounded-full bg-[#FFFFFF] border-2 border-canopy-sage shadow-editorial flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-canopy-deep" />
          </div>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[11px] text-ink-muted mr-1">Presets:</span>
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onCanopyChange(preset.value)}
            className={`px-2.5 py-1 text-[11px] rounded-full transition-all border ${
              Math.abs(simulation.addedCanopyPct - preset.value) < 0.3
                ? 'bg-canopy-deep text-canvas border-canopy-deep font-medium'
                : 'bg-card text-ink-secondary border-hairline hover:bg-card-floating'
            }`}
          >
            {preset.label}
          </button>
        ))}
        {simulation.addedCanopyPct > 0 && (
          <button
            onClick={() => onCanopyChange(0)}
            className="px-2 py-1 text-[11px] rounded-full text-ink-muted hover:text-ink-primary ml-auto"
          >
            Reset
          </button>
        )}
      </div>

      {/* Projection Impact Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-hairline/80">
        
        <div className="bg-card-floating rounded-2xl p-2.5 border border-hairline">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mb-1">
            <TreePine className="w-3.5 h-3.5 text-canopy-sage" />
            <span>Projected LST</span>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono-numbers text-base font-semibold text-canopy-deep">
              {simulation.projectedLST_F}°F
            </span>
            <span className="text-[11px] line-through text-ink-muted">
              {tract.avgLST_F}°F
            </span>
          </div>
        </div>

        <div className="bg-card-floating rounded-2xl p-2.5 border border-hairline">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mb-1">
            <Clock className="w-3.5 h-3.5 text-heat-amber" />
            <span>Heat Stress Relief</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono-numbers text-base font-semibold text-ink-primary">
              {simulation.coolingHoursSavedPerYear.toLocaleString()}
            </span>
            <span className="text-[10px] text-ink-muted">CDH/yr</span>
          </div>
        </div>

        <div className="bg-card-floating rounded-2xl p-2.5 border border-hairline col-span-2 sm:col-span-1">
          <div className="flex items-center gap-1.5 text-[11px] text-ink-muted mb-1">
            <Droplets className="w-3.5 h-3.5 text-canopy-sage" />
            <span>Evapotranspiration</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-mono-numbers text-base font-semibold text-canopy-accent">
              {(simulation.evapotranspirationReliefGallons / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] text-ink-muted">gal/day</span>
          </div>
        </div>

      </div>

    </div>
  );
};
