import { TractData, SimulationState } from '../types';

/**
 * Calculates biophysical cooling and health impact metrics based on simulated canopy addition.
 * Formula from peer-reviewed urban forestry research:
 * Empirical cooling slope is ~0.38°F surface temperature drop per 1% canopy gain in dense urban fabric.
 */
export function calculateCanopySimulation(
  tract: TractData,
  addedCanopyPct: number
): SimulationState {
  // Trees per 1% canopy increase based on tract acreage
  // ~1 canopy acre ~ 80 mature shade trees with standard 25ft crown spread
  const treesPerCanopyPct = Math.max(25, Math.round((tract.totalAcres * 0.01) * 75));
  const treesToPlant = Math.round(addedCanopyPct * treesPerCanopyPct);

  // Cooling calculation with imperv dampening factor
  const imperviousFactor = 0.95 + (tract.imperviousSurfacePct / 200); // 1.0 to 1.45
  const rawCooling = addedCanopyPct * 0.38 * (imperviousFactor * 0.9);
  const degreesCooled_F = Number(rawCooling.toFixed(1));
  const projectedLST_F = Number((tract.avgLST_F - degreesCooled_F).toFixed(1));

  // Projected Heat Vulnerability Index (1 to 5 scale)
  // Drops as temperature and canopy reach safe thresholds
  const hviReduction = Math.min(
    tract.heatVulnerabilityScore - 1,
    (degreesCooled_F / 3.5) + (addedCanopyPct / 18)
  );
  const projectedHVI = Math.max(1, Number((tract.heatVulnerabilityScore - hviReduction).toFixed(1)));

  // Annual Avoided Cooling Degree Hours (CDH)
  // Each 1°F reduction saves ~140 cooling degree hours during summer months
  const coolingHoursSavedPerYear = Math.round(degreesCooled_F * 145);

  // Estimated daily evapotranspiration cooling moisture (gallons/day across tract)
  const evapotranspirationReliefGallons = Math.round(treesToPlant * 45);

  return {
    addedCanopyPct,
    treesToPlant,
    projectedLST_F,
    degreesCooled_F,
    projectedHVI,
    coolingHoursSavedPerYear,
    evapotranspirationReliefGallons,
  };
}

/**
 * Returns color token for Land Surface Temperature anomaly
 */
export function getThermalColor(anomaly: number): string {
  if (anomaly >= 8.0) return '#B84A39'; // heat-severe (Terracotta)
  if (anomaly >= 4.0) return '#D97746'; // heat-moderate (Burnt Amber)
  if (anomaly >= 1.0) return '#EAB365'; // heat-mild (Ochre)
  return '#8C827A'; // baseline / cool
}

/**
 * Returns color token for Canopy Cover Percentage
 */
export function getCanopyColor(canopyPct: number): string {
  if (canopyPct >= 28) return '#2D4739'; // canopy-primary (Deep Forest)
  if (canopyPct >= 18) return '#5B7563'; // canopy-accent (Sage Green)
  if (canopyPct >= 10) return '#8FA895'; // medium sage
  return '#D2DDD4'; // low canopy pale sage
}

/**
 * Computes linear regression parameters (slope, intercept, R²) for Canopy vs LST
 */
export function computeRegression(tracts: TractData[]): {
  slope: number;
  intercept: number;
  r2: number;
  minCanopy: number;
  maxCanopy: number;
} {
  const n = tracts.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0, minCanopy: 0, maxCanopy: 40 };

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;
  let sumY2 = 0;

  let minCanopy = 100;
  let maxCanopy = 0;

  for (const t of tracts) {
    const x = t.canopyCoverPct;
    const y = t.avgLST_F;
    sumX += x;
    sumY += y;
    sumXY += x * y;
    sumX2 += x * x;
    sumY2 += y * y;

    if (x < minCanopy) minCanopy = x;
    if (x > maxCanopy) maxCanopy = x;
  }

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;

  // Correlation coefficient (r) and R^2
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  const r = denominator !== 0 ? numerator / denominator : 0;
  const r2 = Number((r * r).toFixed(3));

  return {
    slope: Number(slope.toFixed(2)),
    intercept: Number(intercept.toFixed(1)),
    r2,
    minCanopy: Math.floor(minCanopy),
    maxCanopy: Math.ceil(maxCanopy),
  };
}
