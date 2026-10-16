export type LandCoverType = 
  | 'Industrial' 
  | 'High-Density Residential' 
  | 'Parkland' 
  | 'Commercial' 
  | 'Mixed-Use';

export type RedliningClass = 'A (Best)' | 'B (Desirable)' | 'C (Declining)' | 'D (Hazardous / Redlined)' | 'Not Graded';

export interface DiurnalPoint {
  hour: string;
  tractTemp: number;
  baselineTemp: number;
  parkTemp: number;
}

export interface TractGeometry {
  type: 'Polygon';
  coordinates: [number, number][]; // [lat, lng] array for leaflet polygon
}

export interface TractData {
  id: string;
  name: string;
  boroughOrDistrict: string;
  cityName: string;
  fipsCode: string;
  zipCode: string;
  avgLST_F: number;
  cityBaselineDelta: number;
  canopyCoverPct: number;
  targetCanopyPct: number;
  povertyPct: number;
  heatVulnerabilityScore: number; // 1 to 5 scale
  primaryLandCover: LandCoverType;
  population: number;
  asthmaHospitalizationRate: number; // per 10k
  historicRedliningClass: RedliningClass;
  estimatedExistingTrees: number;
  totalAcres: number;
  imperviousSurfacePct: number;
  ndviMean: number;
  center: [number, number]; // [lat, lng]
  boundary: [number, number][]; // Polygon coordinates in [lat, lng]
  diurnalProfile: DiurnalPoint[];
}

export interface CityBaseline {
  id: string;
  cityName: string;
  stateCode: string;
  regionLabel: string;
  center: [number, number];
  zoom: number;
  baselineLST_F: number;
  meanCanopyPct: number;
  satelliteCaptureDate: string;
  satelliteSensor: string;
  cloudCoverPct: number;
  tractCount: number;
}

export interface SimulationState {
  addedCanopyPct: number;
  treesToPlant: number;
  projectedLST_F: number;
  degreesCooled_F: number;
  projectedHVI: number;
  coolingHoursSavedPerYear: number;
  evapotranspirationReliefGallons: number;
}

export type MapLayerMode = 'thermal' | 'canopy' | 'bivariate';

export type GrantProgram = 
  | 'Justice40 Disadvantaged Community Resilience Grant'
  | 'USDA Forest Service Urban & Community Forestry (IRA)'
  | 'EPA Climate Pollution Reduction Grant (CPRG)';

export interface GrantDossierPayload {
  organizationName: string;
  applicantTitle: string;
  targetGrant: GrantProgram;
  selectedTract: TractData;
  simulation: SimulationState;
  cityBaseline: CityBaseline;
  notes: string;
}
