# Hyper-Local-Heat-Island-Analyzer

[![Live Demo](https://img.shields.io/badge/Demo-GitHub%20Pages-brightgreen)](https://domainschool.github.io/Hyper-Local-Heat-Island-Analyzer/)
[![GitHub Pages](https://img.shields.io/badge/Deployment-gh--pages-blue)](https://github.com/domainschool/Hyper-Local-Heat-Island-Analyzer/tree/gh-pages)
[![SDG 11](https://img.shields.io/badge/UN%20SDG-11%3A%20Sustainable%20Cities-orange)](https://sdgs.un.org/goals/goal11)
[![React 18](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**The Urban Canopy Report — Hyper-Local Heat Island Analyzer (SDG 11)**  
*An Editorial Climate Intelligence Interface contrasting Land Surface Temperature (LST) anomalies with urban tree canopy deficits to unlock municipal resilience funding.*

🔗 **Live Web Application:** [https://domainschool.github.io/Hyper-Local-Heat-Island-Analyzer/](https://domainschool.github.io/Hyper-Local-Heat-Island-Analyzer/)

---

## 🌿 Executive Summary & Context

Municipalities and environmental justice coalitions leave hundreds of millions of dollars in federal and state climate resilience funding on the table every year (e.g., U.S. Federal Justice40 Initiative, USDA Forest Service Urban & Community Forestry IRA Grants, and EPA CPRG). These funding opportunities require rigorous, defensible spatial evidence:
1. Quantified baseline **Land Surface Temperature (LST)** anomalies at census tract granularity.
2. Direct statistical correlation between impervious surfaces, redlining, and tree canopy deficits.
3. Pre- and post-intervention biophysical cooling projections.
4. Exportable, audit-ready grant justification briefs.

**Hyper-Local Heat Island Analyzer** solves this data translation bottleneck. It bridges satellite remote sensing physics (Landsat 8/9 thermal infrared and Sentinel-2 multispectral indices) with an intuitive editorial dashboard tailored for municipal planners, city arborists, and non-profit grant writers.

---

## ⚡ Core Features

- **🗺️ Interactive Cartography:**
  - Dynamic Leaflet microclimate map rendering census tracts with customized parchment aesthetics.
  - Dual-layer visualization: toggle between **Thermal Land Surface Temperature (LST)** and **Tree Canopy Cover (%)**.
  - Interactive census tract polygons with instant microclimate inspection.

- **🧪 What-If Canopy Intervention Simulator:**
  - Real-time empirical cooling engine modeling the thermal impact of planting +5% to +30% tree canopy.
  - Calculates projected surface temperature drop (°F), avoided heat emergency hospitalizations, and estimated required municipal capital investment.

- **📊 Statistical Analytics & Remote Sensing Curves:**
  - **Scatter Regression Chart:** Visualizes the inverse relationship between canopy coverage and surface temperature anomalies across all tracts.
  - **Diurnal Heat Retention Curve:** 24-hour diurnal thermal profiles highlighting the dangerous nighttime heat trapping caused by dense asphalt and concrete.

- **📑 Justice40 Audit-Ready Grant Brief Modal:**
  - Generates downloadable, audit-ready grant dossiers formatted with federal grant criteria, statutory socioeconomic indices (poverty rate, pediatric asthma prevalence, historic redlining grades), and biophysical cooling projections.
  - Instant print/PDF export and Markdown copy for inclusion into grant applications.

- **🌆 Multi-City Regional Baselines:**
  - Built-in comprehensive data for **New York City (NY)**, **Phoenix (AZ)**, **Chicago (IL)**, and **Atlanta (GA)**.

- **📖 Integrated Learning Guide:**
  - Comprehensive educational breakdown explaining Landsat thermal infrared (TIRS) physics, Planck brightness temperatures, surface emissivity, NDVI calculations, and urban microclimates.

---

## 🛰️ Remote Sensing Methodology

### 1. Normalized Difference Vegetation Index (NDVI)
$$NDVI = \frac{\text{NIR} - \text{Red}}{\text{NIR} + \text{Red}}$$
- **Landsat 8/9:** Band 5 (Near-Infrared) & Band 4 (Red).
- Quantifies photosynthetic vigor and distinguishes asphalt/concrete ($NDVI \le 0.1$) from dense cooling tree crowns ($NDVI \ge 0.5$).

### 2. Land Surface Temperature (LST) Derivation
$$\text{LST} = \frac{T_B}{1 + \left(\frac{\lambda \cdot T_B}{\rho}\right) \ln(\epsilon)}$$
- Converts Landsat Band 10 Top-of-Atmosphere (TOA) spectral radiance to Brightness Temperature ($T_B$) using Planck radiance constants.
- Corrects for fractional vegetation cover ($P_v$) and land surface emissivity ($\epsilon$).

### 3. Empirical Cooling Model
$$\Delta T_{\text{cooling}} = \Delta \text{Canopy\%} \times 0.38^\circ\text{F} \times f_{\text{impervious}}$$
Derived from peer-reviewed urban microclimate literature to model localized microclimate mitigation.

---

## 🛠️ Technology Stack

- **Framework:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler:** [Vite 5](https://vitejs.dev/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/) with custom editorial earth-and-clay typography & design tokens
- **Mapping:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) with CartoDB Positron basemaps
- **Data Visualization:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** GitHub Pages (Automated via GitHub Actions + `gh-pages`)

---

## 🚀 Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [pnpm](https://pnpm.io/) (v9 recommended, or npm / yarn)

### Installation

```bash
# Clone the repository
git clone https://github.com/domainschool/Hyper-Local-Heat-Island-Analyzer.git
cd Hyper-Local-Heat-Island-Analyzer

# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

Visit `http://localhost:5173` in your browser.

### Building for Production

```bash
pnpm run build
```

The production output will be generated in the `dist/` directory.

---

## 🌐 GitHub Pages Deployment & Activation
 
The production application is pre-built and published to the `gh-pages` branch on GitHub.
 
### Activating GitHub Pages (One-time Setup)
1. Go to your repository on GitHub: [Hyper-Local-Heat-Island-Analyzer Settings](https://github.com/domainschool/Hyper-Local-Heat-Island-Analyzer/settings/pages).
2. Under **Build and deployment** > **Source**, select **Deploy from a branch**.
3. Under **Branch**, select `gh-pages` and `/ (root)`.
4. Click **Save**.
5. Your application will be live at:
   👉 **[https://domainschool.github.io/Hyper-Local-Heat-Island-Analyzer/](https://domainschool.github.io/Hyper-Local-Heat-Island-Analyzer/)**
 
### Redeploying Updates
Whenever you make changes to the source code, deploy the updated build in one command:
 
```bash
pnpm run deploy
```
This automatically runs `pnpm run build` and updates the `gh-pages` branch on GitHub.

---

## 🤝 Contributing & License

Contributions, issues, and feature requests are welcome!

This project is open-source under the [MIT License](LICENSE).
