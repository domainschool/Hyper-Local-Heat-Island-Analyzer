import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TractData } from '../../types';
import { Moon, Sun } from 'lucide-react';

interface DiurnalRetentionChartProps {
  tract: TractData;
}

export const DiurnalRetentionChart: React.FC<DiurnalRetentionChartProps> = ({ tract }) => {
  return (
    <div className="w-full bg-card rounded-3xl p-5 border border-hairline shadow-editorial space-y-3">
      
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-heat-tint text-heat-terracotta flex items-center justify-center">
            <Moon className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="font-serif text-base font-normal text-ink-primary">
              24-Hour Diurnal Heat Trap Curve
            </h3>
            <p className="text-[11px] text-ink-muted">
              Nighttime re-radiation disparity: built asphalt vs. canopy buffer
            </p>
          </div>
        </div>

        {/* Legend pills */}
        <div className="flex items-center gap-3 text-[11px] text-ink-secondary flex-wrap">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-heat-terracotta" />
            <span>{tract.name.split('—')[0].trim()}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-ink-muted" />
            <span>City Baseline</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-canopy-sage" />
            <span>Canopy Buffer</span>
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[220px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={tract.diurnalProfile}
            margin={{ top: 10, right: 15, bottom: 0, left: -10 }}
          >
            <defs>
              <linearGradient id="tractGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#B84A39" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#B84A39" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="parkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5B7563" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#5B7563" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 31, 29, 0.08)" />
            <XAxis
              dataKey="hour"
              tick={{ fill: '#8C827A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(34, 31, 29, 0.15)' }}
              tickLine={false}
            />
            <YAxis
              domain={['dataMin - 4', 'dataMax + 4']}
              unit="°"
              tick={{ fill: '#8C827A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(34, 31, 29, 0.15)' }}
              tickLine={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const p = payload[0].payload;
                  return (
                    <div className="bg-card-floating p-2.5 rounded-xl border border-hairline shadow-floating text-xs space-y-1 font-mono-numbers">
                      <div className="font-serif font-medium text-ink-primary border-b border-hairline pb-1">
                        Time: {p.hour}
                      </div>
                      <div className="text-heat-terracotta">
                        {tract.name.split('—')[0].trim()}: <strong>{p.tractTemp}°F</strong>
                      </div>
                      <div className="text-ink-secondary">
                        City Baseline: <strong>{p.baselineTemp}°F</strong>
                      </div>
                      <div className="text-canopy-deep">
                        Canopy Buffer: <strong>{p.parkTemp}°F</strong>
                      </div>
                      <div className="text-[10px] text-ink-muted pt-0.5">
                        Night Heat Trap: +{(p.tractTemp - p.parkTemp).toFixed(1)}°F excess
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Areas */}
            <Area
              type="monotone"
              dataKey="tractTemp"
              stroke="#B84A39"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#tractGradient)"
              name={tract.name}
            />
            <Area
              type="monotone"
              dataKey="parkTemp"
              stroke="#5B7563"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#parkGradient)"
              name="Canopy Buffer"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center justify-between text-[11px] text-ink-muted pt-1">
        <span className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-ink-secondary" />
          Midnight Heat Radiation: Pavement retains heat until 4 AM
        </span>
        <span className="flex items-center gap-1">
          <Sun className="w-3 h-3 text-heat-amber" />
          Peak Solar Insolation (12:00–15:00)
        </span>
      </div>

    </div>
  );
};
