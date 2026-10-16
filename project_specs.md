# Project Specification: The Hyper-Local Heat Island Analyzer
### *Canopy & Clay* — An Editorial Climate Intelligence Interface (SDG 11)

---

## 1. Executive Overview & Problem Context
The **Hyper-Local Heat Island Analyzer** is an interactive, spatial climate-resilience web application designed for municipal planners, environmental non-profits, urban foresters, and civic researchers. It bridges the critical data translation bottleneck in federal and state climate grant cycles (e.g., U.S. Federal Justice40 Initiative, USDA Forest Service Urban & Community Forestry, and state-level resilience programs).

While satellite sensors routinely capture high-resolution thermal infrared and multispectral imagery, translating raw top-of-atmosphere data into defensible, audit-ready grant evidence requires specialized GIS personnel. This application automates this entire pipeline into an intuitive, world-class interface that adheres to the **Canopy & Clay** editorial design system.

---

## 2. User Inputs

1. **Spatial Navigation & Search:**
   - **Metropolitan Region Switcher:** Quick toggling between representative metropolitan datasets (e.g., New York City / South Bronx & Upper Manhattan, Chicago West & South Sides, Philadelphia).
   - **Tract & Zip Search Bar:** Autocomplete search input filtering census tracts by name, neighborhood designation, FIPS code, or zip code.
   - **Interactive Map Selection:** Direct click and hover selection on Leaflet GeoJSON tract polygons.
   - **Vulnerability Filter Toggles:** Filter tracts by priority status (e.g., "Critical Intervention Zones", "Low Canopy (<15%)", "Severe Anomaly (>+8°F)").

2. **Layer & Visualization Controls:**
   - **Display Mode Selector:**
     - *Thermal Anomaly (LST):* Choropleth ramp showing surface temperature deviation above municipal baseline.
     - *Canopy Density (NDVI / LiDAR):* Choropleth ramp showing tree canopy percentage.
     - *Bivariate Disparity Overlay:* Synchronized dual-view / swipe visualizer contrasting heat intensity with canopy deficit.
   - **Basemap Filter:** Warm parchment CartoDB Positron cartography tinted to match the archival paper aesthetic.

3. **"Cooling Horizon" What-If Simulation Engine Inputs:**
   - **Target Tree Addition / Canopy Increase Slider:** Interactive pill slider allowing users to simulate an increase in canopy cover from `0%` to `+30%` (or `+100` to `+5,000` mature trees).
   - **Species & Microclimate Scenario Selector:** Optional mitigation type adjustment (e.g., High-Shade Broadleaf vs. Pocket Forests vs. Cool Pavements).

4. **Grant Brief Customization & Export Triggers:**
   - **Organization & Applicant Name:** Custom field for the applying non-profit or municipal department.
   - **Grant Program Focus:** Selector for Justice40, USDA Urban & Community Forestry, or EPA Climate Pollution Reduction Grants.
   - **Export Action Triggers:**
     - *Print-Ready 1-Page PDF:* Formats the browser viewport into a federal grant brief via `@media print`.
     - *Markdown Dossier Export:* Downloads structured markdown evidence packet for copy-pasting into federal grant portals.
     - *CSV / GeoJSON Export:* Export selected tract metrics and simulation parameters for external spatial analysis.

---

## 3. Workflows & Scientific Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            DATA INGESTION                                   │
│  - Bundled High-Fidelity GeoJSON: NYC (South Bronx/Manhattan), Chicago,     │
│    Philadelphia with Landsat 8/9 ST_B10 LST & Municipal Canopy Data         │
│  - Optional Live Socrata SODA API / USGS STAC API querying                  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    ZONAL REDUCTIONS & MATH ENGINE                           │
│  - Land Surface Temp (LST): T_B derivation with emissivity (ε) correction   │
│  - Canopy Metric: Fractional Vegetation Cover (P_v) & Mean NDVI             │
│  - Baseline Anomaly: ΔT = Tract_LST - Baseline_LST                          │
│  - Vulnerability Classification: Heat Vulnerability Index (1 to 5)          │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   COOLING HORIZON SIMULATION ENGINE                         │
│  - Biophysical cooling: ΔT_cooling = ΔCanopy% × 0.38°F                      │
│  - Adjusted LST: Projected_LST = Tract_LST - ΔT_cooling                     │
│  - Avoided Heat Strain Index: Real-time recalculation of vulnerability tier │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PRESENTATION & GRANT EVIDENCE                           │
│  - Leaflet Parchment Cartography with Choropleth Boundaries                 │
│  - "Thermal Disparity" Split Gauge & Tactile Metric Cards                   │
│  - Recharts: Canopy vs. Temp Regression Plot & Diurnal Dissipation Curve    │
│  - 1-Page Audit-Ready Justice40 Evidence Dossier with Print View            │
└─────────────────────────────────────────────────────────────────────────────┘
```

1. **Data Ingestion & Multi-City Spatial Models:**
   - Curated, high-precision GeoJSON vector polygons containing genuine census tract geometries, derived Landsat 8/9 Band 10 surface temperatures, municipal tree canopy percentages, and demographic vulnerability indices (poverty %, asthma hospitalization rates, historic redlining markers).
   - Extensible hook architecture allowing plug-and-play connections to live SODA / STAC APIs.

2. **Thermal & Remote Sensing Math:**
   - **NDVI Calculation:** $NDVI = \frac{NIR - Red}{NIR + Red}$
   - **Fractional Vegetation Cover:** $P_v = \left(\frac{NDVI - NDVI_{min}}{NDVI_{max} - NDVI_{min}}\right)^2$
   - **Land Surface Emissivity:** $\epsilon = 0.004 \times P_v + 0.986$
   - **Thermal Anomaly:** $\Delta T = LST_{\text{tract}} - LST_{\text{city\_baseline}}$

3. **Cooling Horizon Simulation Workflow:**
   - As the user pulls the simulation slider, the biophysical cooling equation recalibrates:
     $$\Delta T_{\text{cooling}} = \Delta \text{Canopy\%} \times 0.38^\circ\text{F}$$
   - Dynamic calculation of avoided cooling degree hours, reduction in heat vulnerability score, and projected summer peak temperature.

4. **Analytics & Correlation Workflow:**
   - Recharts scatter plot showing all census tracts in the metropolitan area plotted across Canopy Cover % ($X$-axis) versus Surface Temperature °F ($Y$-axis).
   - Linear regression line demonstrating the inverse correlation between tree cover and surface heating.
   - Active tract animated locator node.
   - Diurnal heat retention bar chart showing nighttime thermal radiation retention in impervious asphalt tracts versus canopy-buffered tracts.

5. **Grant Evidence Synthesis & Export Workflow:**
   - Generates a 1-page, audit-ready Justice40 Compliance Brief.
   - Highlights: Federal eligibility statement, baseline vs. target metrics, quantitative justification, and projected cooling impact.
   - Zero-backend client print engine: using dedicated `@media print` CSS rules, all navigation bars, sidebars, and UI widgets are stripped, leaving an elegant archival document ready for PDF generation.

---

## 4. Tools, Libraries & Technology Stack

- **Core Framework:** React 18 / 19 with Vite 5/6 (Single Page Application, static bundle).
- **Language:** Strict TypeScript (`.ts`, `.tsx`). `any` type is strictly forbidden.
- **Package Manager:** `pnpm` exclusively.
- **Styling & Design System:** Tailwind CSS configured with the custom tokens from `design.md` (*Canopy & Clay*).
- **Typography:**
  - Serif Display: `Newsreader` / `Georgia`
  - Sans-Serif UI: `Plus Jakarta Sans` / `Inter`
  - Tabular Mono: `JetBrains Mono` / `Space Mono`
- **Mapping & Geospatial:**
  - `leaflet` and `react-leaflet` for responsive, interactive vector rendering.
  - CartoDB Positron / Stadia Alidade Smooth warm parchment tiles.
  - Custom SVG markers and choropleth color ramps.
- **Analytics & Charting:**
  - `recharts` for the canopy-temperature scatter plot regression and diurnal heat retention curves.
- **Icons & Tactile Details:**
  - `lucide-react` for environmental and analytical iconography.
- **Deployment:**
  - Static distribution via `gh-pages` and Vite `base` repository configuration.

---

## 5. Expected Outputs & Signature UI Elements

1. **Canopy & Clay Design Tokens Strictly Applied:**
   - Primary Canvas: `#FBF9F5` (warm bone/linen).
   - Card Surfaces: `#F4F0E8` (elevated), `#EFE9DC` (subtle/active), `#FFFFFF` (floating).
   - Ink: `#221F1D` (primary roasted umber), `#57524E` (secondary stone), `#8C827A` (silt gray).
   - Thermal Palette: `#B84A39` (Terracotta >+8°F), `#D97746` (Burnt Amber +3°F to +7°F), `#EAB365` (Ochre ±2°F), `#FBEFEA` (Terracotta tint).
   - Canopy Palette: `#2D4739` (Deep Forest), `#5B7563` (Sage Green), `#E2EBE4` (Dew Sage tint).
   - Border: Hairline `rgba(34, 31, 29, 0.07)`.
   - Radii: `rounded-3xl` (24px) for cards, `rounded-2xl` (16px) for controls, `rounded-full` for gauges.
   - Shadows: Diffused warm ambient shadows (`0 10px 30px -10px rgba(78, 67, 58, 0.07)`).

2. **Signature Component 1: The "Thermal Disparity" Split Gauge:**
   - Horizontal pill container (`rounded-full`, bg `#EFE9DC`, height 48px).
   - Left half: Canopy relief (soft sage fill with leaf icon and current percentage).
   - Center divider: Hairline etched division.
   - Right half: Thermal excess (muted terracotta fill with sun icon and +°F anomaly).

3. **Signature Component 2: The Organic Map Interface:**
   - Warm parchment cartography overlaid with soft terracotta heat pools and forest canopy clusters.
   - Interactive hover cards and click-to-inspect tract geometry.
   - Layer switchers: Heat Anomaly vs. Canopy Cover vs. Combined Bivariate view.

4. **Signature Component 3: The "Cooling Horizon" Simulation Slider:**
   - Custom pill slider track shifting from burnt amber into forest green as canopy is added.
   - Oversized paper thumb with sage-green inner ring and tactile drop shadow.
   - Real-time readout of projected surface temperature and cooled degrees.

5. **Signature Component 4: Comparative Analytics Drawer / Tab:**
   - Interactive Recharts scatter plot with linear regression line and animated active tract highlight.
   - Diurnal heat retention bar comparison showing 24-hour heat dissipation traps.

6. **Signature Component 5: 1-Page Federal Grant Evidence Dossier:**
   - Printable modal view formatted with executive summary, statutory justifications, pre/post intervention projections, and Justice40 program alignment.
   - Instant `@media print` clean paper export.

---

## 6. Data Storage & Reactive State Architecture

- **State Management:**
  - Modular React state and custom hooks:
    - `useTractData`: Manages spatial datasets, filtering, search, and tract selection.
    - `useCanopySimulation`: Manages What-If slider state, biophysical calculations, and cooling metrics.
    - `useGrantDossier`: Handles dossier customization, applicant data, and print generation.
- **Persistence:**
  - `localStorage` adapter: Persists user-bookmarked tracts, custom intervention scenarios, and user preferences without requiring a remote database.
- **Zero-Backend Execution:**
  - 100% client-side execution ready for instant static deployment on GitHub Pages.
  - Environment variable support (`VITE_` prefix) for optional external spatial endpoints or Gemini API keys.

---

## 7. Deployment Target

- **Hosting Platform:** GitHub Pages.
- **Build Tool:** Vite with `@vitejs/plugin-react`.
- **Configured Base Path:** `base: './'` or `base: '/<repository-name>/'`.
- **Deployment Script:** `gh-pages -d dist`.
- **Clean Build Standard:** Must pass `tsc && vite build` with zero TypeScript errors or warnings.

---

## 8. Definition of Done (DoD) Checklist

- [ ] **Specs Approved:** `project_specs.md` reviewed and explicitly approved by the user.
- [ ] **Design System Fidelity:** Interface strictly implements the *Canopy & Clay* tokens (colors, typography, radii, shadows, borders) defined in `design.md`. Zero default browser or unstyled elements.
- [ ] **Strict TypeScript:** 100% TypeScript with complete interfaces (`TractData`, `SimulationState`, `DossierData`, etc.). No `any` types.
- [ ] **Interactive Spatial Map:** Fully functional Leaflet map with warm parchment basemap, GeoJSON tract polygons, dynamic choropleths (heat and canopy), tooltips, and click-to-select.
- [ ] **Interactive Split Gauge:** Thermal Disparity Split Gauge visually contrasting Canopy Relief vs. Thermal Excess.
- [ ] **What-If Simulation Slider:** Live reactive calculations of projected cooling, adjusted vulnerability score, and avoided heat stress hours.
- [ ] **Analytical Visualizations:** Recharts scatter plot with regression trend line and diurnal heat retention chart.
- [ ] **Grant Dossier Exporter:** 1-page printable dossier with `@media print` styling that formats cleanly to a single page PDF.
- [ ] **Responsive & Accessible:** Flawless layout on desktop, tablet, and mobile; accessible ARIA tags and color contrast.
- [ ] **Clean Production Build:** `pnpm run build` compiles with zero errors or warnings.
- [ ] **User Confirmation Gate:** Halts for user review and testing after Tier 1 MVP before any subsequent changes or GitHub deployment.
