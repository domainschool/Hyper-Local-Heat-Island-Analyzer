import React from 'react';
import { Leaf, Flame } from 'lucide-react';

interface ThermalDisparityGaugeProps {
  canopyPct: number;
  temperatureDelta: number;
  targetCanopyPct?: number;
}

export const ThermalDisparityGauge: React.FC<ThermalDisparityGaugeProps> = ({
  canopyPct,
  temperatureDelta,
  targetCanopyPct = 30.0,
}) => {
  const isSevereHeat = temperatureDelta >= 8.0;
  const isSevereDeficit = canopyPct < 15.0;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between text-xs text-ink-muted">
        <span className="flex items-center gap-1.5 font-medium text-canopy-deep">
          <Leaf className="w-3.5 h-3.5 text-canopy-sage" />
          Canopy Relief Target ({targetCanopyPct}%)
        </span>
        <span className="flex items-center gap-1.5 font-medium text-heat-terracotta">
          <Flame className="w-3.5 h-3.5 text-heat-terracotta" />
          Surface Anomaly vs. Baseline
        </span>
      </div>

      {/* Signature Split Pill Container */}
      <div className="relative h-12 w-full bg-card-subtle rounded-full border border-hairline p-1 flex items-center shadow-inner overflow-hidden">
        
        {/* Left Half: Canopy Relief */}
        <div 
          className="h-full flex items-center justify-start px-3.5 rounded-l-full bg-canopy-tint/80 border-r border-hairline/80 transition-all duration-500 ease-out flex-1"
          style={{ width: `${Math.min(55, Math.max(30, canopyPct * 1.5))}%` }}
        >
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-canopy-sage/20 flex items-center justify-center text-canopy-deep flex-shrink-0">
              <Leaf className="w-3.5 h-3.5 text-canopy-deep" />
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-mono-numbers text-sm font-semibold text-canopy-deep">
                {canopyPct.toFixed(1)}%
              </span>
              <span className="text-[11px] text-canopy-sage font-medium uppercase tracking-wider hidden sm:inline">
                Canopy
              </span>
            </div>
          </div>
        </div>

        {/* Center Divider: Elegant Hairline Etch */}
        <div className="w-[1.5px] h-6 bg-ink-primary/15 self-center mx-1 z-10 flex-shrink-0" />

        {/* Right Half: Thermal Excess */}
        <div 
          className={`h-full flex items-center justify-end px-3.5 rounded-r-full transition-all duration-500 ease-out flex-1 ${
            isSevereHeat ? 'bg-heat-tint' : 'bg-card-subtle'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-baseline gap-1 text-right">
              <span className={`font-mono-numbers text-sm font-semibold ${
                isSevereHeat ? 'text-heat-terracotta' : 'text-heat-amber'
              }`}>
                {temperatureDelta >= 0 ? `+${temperatureDelta.toFixed(1)}` : temperatureDelta.toFixed(1)}°F
              </span>
              <span className="text-[11px] text-ink-muted uppercase tracking-wider hidden sm:inline">
                Anomaly
              </span>
            </div>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              isSevereHeat ? 'bg-heat-terracotta/20 text-heat-terracotta' : 'bg-heat-amber/20 text-heat-amber'
            }`}>
              <Flame className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

      </div>

      {/* Disparity Insight Note */}
      <div className="flex items-center justify-between text-[11px] text-ink-muted px-1">
        <span>
          {isSevereDeficit ? 'Deficit: ' + (targetCanopyPct - canopyPct).toFixed(1) + '% below benchmark' : 'Meets municipal standard'}
        </span>
        <span className="font-serif italic">
          {temperatureDelta > 7 ? 'Extreme thermal burden zone' : 'Moderate thermal corridor'}
        </span>
      </div>
    </div>
  );
};
