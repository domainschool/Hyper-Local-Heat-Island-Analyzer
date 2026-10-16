import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { TractData } from '../../types';
import { computeRegression } from '../../utils/remoteSensing';
import { Activity } from 'lucide-react';

interface ScatterRegressionChartProps {
  tracts: TractData[];
  selectedTractId: string;
  onSelectTract: (tract: TractData) => void;
}

export const ScatterRegressionChart: React.FC<ScatterRegressionChartProps> = ({
  tracts,
  selectedTractId,
  onSelectTract,
}) => {
  const regression = useMemo(() => computeRegression(tracts), [tracts]);

  // Prepare data points for Recharts
  const scatterData = useMemo(() => {
    return tracts.map((t) => ({
      x: t.canopyCoverPct,
      y: t.avgLST_F,
      name: t.name,
      tract: t,
      isSelected: t.id === selectedTractId,
      fill: t.id === selectedTractId ? '#B84A39' : t.canopyCoverPct > 25 ? '#2D4739' : '#D97746',
    }));
  }, [tracts, selectedTractId]);

  // Two endpoints for the regression line
  const regLinePoints = useMemo(() => {
    const x1 = Math.max(0, regression.minCanopy - 2);
    const x2 = Math.min(50, regression.maxCanopy + 4);
    const y1 = regression.slope * x1 + regression.intercept;
    const y2 = regression.slope * x2 + regression.intercept;
    return [
      { x: x1, y: Number(y1.toFixed(1)) },
      { x: x2, y: Number(y2.toFixed(1)) },
    ];
  }, [regression]);

  return (
    <div className="w-full bg-card rounded-3xl p-5 border border-hairline shadow-editorial space-y-3">
      
      {/* Chart Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-full bg-canopy-tint text-canopy-deep flex items-center justify-center">
            <Activity className="w-3.5 h-3.5" />
          </span>
          <div>
            <h3 className="font-serif text-base font-normal text-ink-primary">
              Canopy vs. Temperature Correlation
            </h3>
            <p className="text-[11px] text-ink-muted">
              Spatial regression proving the inverse cooling relationship
            </p>
          </div>
        </div>

        {/* Statistical Correlation Badge */}
        <div className="flex items-center gap-2 font-mono-numbers text-xs bg-card-subtle px-3 py-1 rounded-full border border-hairline text-ink-secondary">
          <span>Slope: <strong className="text-heat-terracotta">{regression.slope}°F / 1%</strong></span>
          <span className="text-ink-muted">•</span>
          <span>R²: <strong className="text-canopy-deep">{regression.r2}</strong></span>
        </div>
      </div>

      {/* Recharts Scatter Plot */}
      <div className="w-full h-[260px] pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 10, right: 20, bottom: 20, left: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(34, 31, 29, 0.08)" />
            <XAxis
              type="number"
              dataKey="x"
              name="Canopy Cover"
              unit="%"
              domain={[0, 'dataMax + 5']}
              tick={{ fill: '#8C827A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(34, 31, 29, 0.15)' }}
              tickLine={false}
              label={{
                value: 'Tree Canopy Cover (%)',
                position: 'insideBottom',
                offset: -12,
                fill: '#57524E',
                fontSize: 11,
              }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Surface Temp"
              unit="°F"
              domain={['dataMin - 3', 'dataMax + 3']}
              tick={{ fill: '#8C827A', fontSize: 11, fontFamily: 'JetBrains Mono' }}
              axisLine={{ stroke: 'rgba(34, 31, 29, 0.15)' }}
              tickLine={false}
              label={{
                value: 'Land Surface Temp (°F)',
                angle: -90,
                position: 'insideLeft',
                offset: 12,
                fill: '#57524E',
                fontSize: 11,
              }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#8C827A' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card-floating p-2.5 rounded-xl border border-hairline shadow-floating text-xs space-y-1">
                      <div className="font-serif font-medium text-ink-primary">
                        {data.name}
                      </div>
                      <div className="font-mono-numbers text-[11px] text-ink-secondary">
                        Canopy: <strong className="text-canopy-deep">{data.x}%</strong>
                      </div>
                      <div className="font-mono-numbers text-[11px] text-ink-secondary">
                        Surface Temp: <strong className="text-heat-terracotta">{data.y}°F</strong>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Regression Trend Line */}
            <ReferenceLine
              segment={[
                { x: regLinePoints[0].x, y: regLinePoints[0].y },
                { x: regLinePoints[1].x, y: regLinePoints[1].y },
              ]}
              stroke="#5B7563"
              strokeWidth={2}
              strokeDasharray="4 4"
            />

            {/* Data Points */}
            <Scatter
              name="Tracts"
              data={scatterData}
              onClick={(node) => {
                if (node && node.tract) {
                  onSelectTract(node.tract);
                }
              }}
              shape={(props: any) => {
                const { cx, cy, payload } = props;
                const isSelected = payload.isSelected;
                return (
                  <g className="cursor-pointer">
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={12}
                        fill="none"
                        stroke="#B84A39"
                        strokeWidth={2}
                        strokeDasharray="3 2"
                        className="animate-spin"
                        style={{ transformOrigin: `${cx}px ${cy}px`, animationDuration: '6s' }}
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 7 : 5}
                      fill={payload.fill}
                      stroke="#FFFFFF"
                      strokeWidth={1.5}
                      className="transition-all hover:scale-125"
                    />
                  </g>
                );
              }}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};
