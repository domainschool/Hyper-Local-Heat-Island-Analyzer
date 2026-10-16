# Explainer: The Hyper-Local Heat Island Analyzer
### *Canopy & Clay* — An Editorial Climate Intelligence Platform (SDG 11)

---

### 1. The Business & Social Problem
Municipalities and environmental non-profits leave hundreds of millions of dollars in federal and state climate-resilience funding on the table each year. Under major climate frameworks (such as the U.S. Federal Justice40 Initiative, the USDA Forest Service Urban & Community Forestry Inflation Reduction Act grants, and EPA Climate Pollution Reduction Grants), 40% to 100% of awarded capital must directly benefit historically disadvantaged and climate-vulnerable communities.

However, grant applications require rigorous, empirically defensible proof:
- Quantified baseline Land Surface Temperature (LST) anomalies at census tract scale.
- Direct statistical correlation with tree canopy deficits.
- Pre- and post-intervention cooling projections.
- Compounding socioeconomic vulnerability documentation (poverty line, pediatric asthma hospitalizations, historic redlining).

Small municipal offices and grassroots non-profits cannot afford specialized GIS engineering teams or five-figure ESRI enterprise licenses to process satellite rasters. Consequently, they either spend 60 to 90 business days manually cobbling together disjointed open data files—frequently missing funding deadlines—or submit unquantified qualitative proposals that fail federal scientific review standards. The business problem is a severe **data translation and spatial compliance bottleneck**: raw satellite thermal imagery exists, but there is no lightweight automation layer converting it into audit-ready grant evidence packages.

---

### 2. Under the Hood: Earth Observation & Remote Sensing Physics

There is a fundamental scientific difference between:
1. **Ambient Air Temperature:** The kinetic energy of air molecules measured in shade, high off the ground (2 meters) in open, ventilated regional airport fields.
2. **Land Surface Temperature (LST):** How hot physical ground, brick walls, and dark asphalt actually get to the touch. On a 90°F summer afternoon, dark asphalt surfaces routinely reach **140°F to 160°F**, radiating heat well past midnight.

#### A. NDVI (Normalized Difference Vegetation Index)
To identify canopy cover and vegetation health, we measure the contrast between red light absorption by chlorophyll and near-infrared (NIR) reflection by mesophyll leaf tissues:
$$NDVI = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$
- In Landsat 8 and 9: **Band 5 is NIR**, and **Band 4 is Red**.
- NDVI values range from $-1.0$ to $+1.0$. Water and pavement sit near or below $0.0$. Sparse shrubbery lands around $0.2 - 0.3$. Dense, cooling tree canopies register above $0.5$.

#### B. Land Surface Temperature (LST) Derivation
Landsat’s Band 10 measures raw Top-of-Atmosphere (TOA) spectral radiance. To turn those raw numbers into surface temperature:
1. **Brightness Temperature ($T_B$):** First, convert spectral radiance ($L_\lambda$) into brightness temperature using Planck's radiance constants ($K_1$ and $K_2$):
   $$T_B = \frac{K_2}{\ln\left(\frac{K_1}{L_\lambda} + 1\right)}$$

2. **Proportion of Vegetation ($P_v$):** Calculate fractional vegetation cover:
   $$P_v = \left(\frac{NDVI - NDVI_{min}}{NDVI_{max} - NDVI_{min}}\right)^2$$

3. **Land Surface Emissivity ($\epsilon$):** Ground surfaces do not radiate heat as perfect black bodies. We calculate surface emissivity:
   $$\epsilon = 0.004 \times P_v + 0.986$$

4. **Final Land Surface Temperature ($LST$):**
   $$LST = \frac{T_B}{1 + \left(\frac{\lambda \times T_B}{\rho}\right) \ln(\epsilon)}$$

---

### 3. Biophysical Cooling Model (What-If Simulation Engine)

The simulation engine implements peer-reviewed empirical urban forestry coefficients:
$$\Delta T_{\text{cooling}} = \Delta \text{Canopy\%} \times 0.38^\circ\text{F} \times f_{\text{impervious}}$$

Where:
- Each 1% gain in tree canopy reduces surface temperature by approximately $0.38^\circ\text{F}$.
- $f_{\text{impervious}} = 0.95 + \frac{\text{Impervious\%}}{200}$ (capturing higher cooling leverage on heat-absorbing asphalt).
- **Avoided Cooling Degree Hours (CDH):** Each $1^\circ\text{F}$ surface drop saves approximately $145 \text{ CDH/year}$ during peak summer periods.
- **Evapotranspiration Relief:** Each mature shade tree produces approximately $45 \text{ gallons/day}$ of cooling moisture transpirative relief.

---

### 4. Technical Architecture & Design System

The application is built in **React 18, Vite, and Strict TypeScript** following the **Canopy & Clay** design system (`design.md`):

1. **Color Palette & Atmospheric Depth:**
   - Primary Canvas: `#FBF9F5` (warm linen / archival paper)
   - Cards: `#F4F0E8` (card), `#EFE9DC` (subtle/active), `#FFFFFF` (floating)
   - Ink: `#221F1D` (roasted umber), `#57524E` (secondary stone), `#8C827A` (silt gray)
   - Canopy Relief: `#2D4739` (Deep Forest), `#5B7563` (Sage Green), `#E2EBE4` (Dew Sage tint)
   - Thermal Excess: `#B84A39` (Terracotta >+8°F), `#D97746` (Burnt Amber), `#EAB365` (Ochre)
   - Hairline borders: `rgba(34, 31, 29, 0.07)`
   - Diffused warm ambient shadows: `box-shadow: 0 10px 30px -10px rgba(78, 67, 58, 0.07)`

2. **Signature UI Elements:**
   - **The Thermal Disparity Split Gauge:** Horizontal pill container (`rounded-full`, `#EFE9DC`, 48px) balancing Sage Green Canopy Relief with Terracotta Thermal Excess.
   - **Warm Parchment Cartography:** CartoDB Positron tiles tinted with archival paper filters, layered with responsive GeoJSON census tract polygons.
   - **The Cooling Horizon Slider:** Custom gradient track shifting from amber into forest green with an oversized tactile paper thumb and real-time biophysical feedback.
   - **Statistical Visualizations (Recharts):** Canopy vs. LST Scatter Plot with linear regression line and active tract highlight, plus 24-hour Diurnal Heat Retention Curves.
   - **1-Page Federal Grant Dossier:** Printable Justice40 Compliance Brief with `@media print` styling that formats directly to a clean PDF without dashboard chrome.
