import React, { useState } from 'react';
import {
  Copy,
  Check,
  Cpu,
  Layers,
  Users,
  GraduationCap,
  TreePine,
  Flame,
  Globe2,
  ChevronRight,
  ShieldCheck,
  Activity,
  AlertTriangle,
} from 'lucide-react';

interface AboutPageProps {
  onSwitchTab: (tab: 'map' | 'analytics' | 'catalog') => void;
}

interface PromptCard {
  id: string;
  tier: string;
  title: string;
  category: 'Foundation' | 'Simulation' | 'Evidence' | 'APIs' | 'Analytics';
  description: string;
  promptText: string;
}

const PROMPT_LIBRARY: PromptCard[] = [
  {
    id: 'p1-1',
    tier: 'Tier 1: MVP 1',
    title: 'Project Architecture, TypeScript Types & Mock Dataset',
    category: 'Foundation',
    description: 'Defines the strongly typed domain entities (TractData, CityBaseline) and builds zero-config local reactive state.',
    promptText: `Act as a Senior Frontend Architect. We are building the frontend MVP for "The Hyper-Local Heat Island Analyzer" (Targeting UN SDG 11: Sustainable Cities). 
Initialize a Next.js (App Router), Tailwind CSS, and Lucide React application with a zero-config, client-side setup.

1. Create a strongly typed TypeScript interface TractData with the following attributes:
   - id: string
   - name: string (e.g., "South Bronx - Mott Haven", "Upper West Side", "Hunts Point")
   - fipsCode: string
   - avgLST_F: number (Land Surface Temp in °F, range 82 to 104)
   - cityBaselineDelta: number (e.g., +11.4)
   - canopyCoverPct: number (range 4% to 42%)
   - povertyPct: number
   - heatVulnerabilityScore: number (1 to 5 scale)
   - primaryLandCover: 'Industrial' | 'High-Density Residential' | 'Parkland' | 'Commercial'

2. Create a local mock array of 8 realistic urban tracts with contrasting thermal profiles (4 high-heat/low-canopy tracts, 4 low-heat/high-canopy tracts).

3. Create the main page layout:
   - Header with product title, SDG 11 badge, and a global search/filter bar.
   - Left pane (w-2/3): An SVG/HTML-based mock interactive spatial map grid representing the tracts. Color-code the tracts dynamically using a thermal ramp (Yellow: 80°F -> Deep Red: 104°F).
   - Right pane (w-1/3): Active Tract Detail Card.
   - Set up React state selectedTract initialized to the first tract in the mock array. Clicking any tract on the map or list must instantly update the state and the detail card without page reload.`,
  },
  {
    id: 'p1-2',
    tier: 'Tier 1: MVP 1',
    title: 'Thermal Disparity Split Gauge & What-If Simulation Engine',
    category: 'Simulation',
    description: 'Implements the biophysical cooling equation and real-time What-If canopy intervention slider.',
    promptText: `Enhance the Tier 1 MVP UI by adding two key components in the right-hand inspection view:

1. Create a "Canopy vs. Thermal Delta" comparative split card:
   - Display two prominent circular progress/stat meters:
     a) "Surface Heat Delta" (colored red with flame icon, showing degrees above municipal average).
     b) "Tree Canopy Cover" (colored emerald with tree icon, showing current % vs. the 30% standard target).
   - Add a dynamic badge: If canopyCoverPct < 15% AND avgLST_F > 95°F, render an alert badge: "CRITICAL INTERVENTION ZONE".

2. Build a local What-If Slider component ("Tree Canopy Intervention Simulator"):
   - A slider ranging from 0% to +30% additional canopy cover.
   - State formula: calculate an estimated temperature reduction:
     projectedLST = tract.avgLST_F - (addedCanopyPct * 0.38)
   - Show dynamic live updates: as the user drags the slider, show the new projected surface temperature, the degrees cooled, and an estimated "Heat Vulnerability Score" reduction in real-time.
   - Ensure the UI contains no external API calls and runs entirely on local React state.`,
  },
  {
    id: 'p1-3',
    tier: 'Tier 1: MVP 1',
    title: 'Client-Side Justice40 Grant Dossier Quick-Export',
    category: 'Evidence',
    description: 'Generates an audit-ready, 1-page statutory compliance brief with zero-backend print styles.',
    promptText: `Complete the MVP 1 tier by adding a client-side "Grant Evidence Quick-Export" modal:

1. Add a primary CTA button: "Generate 1-Page Grant Evidence Sheet" on the Tract Detail Card.
2. When clicked, open a styled modal displaying an audit-ready grant brief with:
   - Header: "Justice40 & Federal Urban Forestry Compliance Brief"
   - Metadata: Census Tract ID, FIPS Code, and Timestamp.
   - Executive Summary: A templated paragraph inserting the tract's local stats:
     "Tract [name] exhibits an average Land Surface Temperature of [avgLST_F]°F during peak summer conditions, representing a [cityBaselineDelta]°F anomaly above the municipal baseline. With current tree canopy at [canopyCoverPct]%, this tract qualifies under priority environmental justice funding criteria."
   - 3-point bulleted breakdown: Thermal Burden, Canopy Deficit, and Population Vulnerability.
   - Print/Save button triggering window.print() with a @media print Tailwind utility that hides the dashboard background and formats only the clean white grant dossier sheet.`,
  },
  {
    id: 'p2-1',
    tier: 'Tier 2: Scale',
    title: 'Server-Side Geospatial API Ingestion (Socrata SODA & GeoJSON)',
    category: 'APIs',
    description: 'Connects to open municipal data portals to fetch real-time census tract vector polygons and tree censuses.',
    promptText: `Transition the project from mock arrays to a live server-side data pipeline. Configure Next.js Route Handlers (app/api/spatial/route.ts) and environment variables (.env.local):

1. Set up an environment variable: MUNICIPAL_DATA_API_KEY (support NYC OpenData SODA API / Socrata).
2. Write a server-side route /api/spatial?bbox=[minLng,minLat,maxLng,maxLat] that:
   - Fetches live GeoJSON polygons of neighborhood boundaries or census tracts.
   - Concurrently fetches street tree density or municipal canopy coverage data.
   - Implements resilient error handling, standard HTTP status codes, and an in-memory or Next.js fetch cache with a 1-hour revalidate tag.
3. In the frontend, replace the static mock map with an asynchronous SWR or React Query hook.
4. Implement realistic UI skeleton states:
   - Render shimmering Tailwind skeleton loaders for the map viewport, metric cards, and tract lists while data is fetching.
   - Handle empty states, network timeouts, and display an error toast if the external API rate limit is reached.`,
  },
  {
    id: 'p2-2',
    tier: 'Tier 2: Scale',
    title: 'Earth Engine & STAC Satellite Thermal Radiance Integration',
    category: 'APIs',
    description: 'Fetches Landsat 8/9 Level-2 ST_B10 thermal band and derives Land Surface Temperature using Planck constants and emissivity.',
    promptText: `Integrate live Earth Observation data processing into our server backend:

1. Create a dedicated backend service /api/thermal-indices:
   - Accept query parameters: lat, lng, startDate, endDate.
   - Connect to a public STAC (SpatioTemporal Asset Catalog) API (e.g., Earth Search on AWS or Google Earth Engine Python/Node wrapper via service account credentials).
   - Ingest Landsat 8/9 Level-2 Surface Temperature (Band ST_B10) and Surface Reflectance (Red Band 4, NIR Band 5).
   - Calculate the mean NDVI and mean LST for the designated bounding box over the cloud-free summer window.
   - Convert raw Kelvin outputs to Fahrenheit: (Kelvin - 273.15) * 9/5 + 32.
2. Secure all Earth Engine or STAC credentials in .env.local (GEE_PRIVATE_KEY, GEE_CLIENT_EMAIL). Never expose keys to the client browser.
3. Update the client UI to display the satellite capture timestamp, cloud cover percentage metadata, and a toggle between "Live Satellite TIR" and "Municipal Canopy" layers.`,
  },
  {
    id: 'p3-3',
    tier: 'Tier 3: Enterprise',
    title: 'Recharts Statistical Regression & Diurnal Heat Retention Curves',
    category: 'Analytics',
    description: 'Implements interactive scatter plots with linear regression math and 24-hour nighttime heat trap dissipation curves.',
    promptText: `Upgrade the visual and analytical UX to enterprise standard:

1. Implement Responsive Data Visualizations using recharts:
   - Canopy vs. Temperature Scatter Plot: Plot all city tracts on an interactive scatter graph (X-axis: Canopy Cover %, Y-axis: Surface Temp °F). Highlight the selected tract with a distinctive animated marker and draw the linear regression trend line to visualize the inverse correlation.
   - Diurnal Heat Retention Bar/Area Chart: Show 24-hour heat dissipation curves comparing asphalt-dense tracts vs. park-adjacent tracts to illustrate nighttime heat traps.
2. Implement an Enterprise-Grade Theme Engine:
   - Configure Tailwind dark mode with CSS variables and next-themes.
   - Provide a persistent Dark/Light mode toggle in the global navbar.
   - Ensure high-contrast data visualization palettes in both modes (e.g., optimized color-blind friendly thermal ramps for satellite layers and high-contrast cartographic basemaps).
3. Ensure all charts and maps are mobile-responsive with viewport-aware auto-resizing containers and accessible ARIA attributes.`,
  },
];

export const AboutPage: React.FC<AboutPageProps> = ({ onSwitchTab }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const filteredPrompts = selectedCategory === 'All'
    ? PROMPT_LIBRARY
    : PROMPT_LIBRARY.filter(p => p.category === selectedCategory);

  return (
    <div className="max-w-[1440px] mx-auto space-y-12 pb-16 animate-in fade-in duration-300">
      
      {/* Editorial Hero Banner */}
      <div className="relative rounded-3xl bg-card p-6 sm:p-10 lg:p-12 border border-hairline shadow-editorial overflow-hidden">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-canopy-tint text-canopy-deep text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>UN Sustainable Development Goal 11: Sustainable Cities & Communities</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-ink-primary tracking-tight leading-tight">
            The Science, Systems Architecture & Economic Moat Behind <span className="italic">The Urban Canopy Report</span>
          </h1>

          <p className="font-serif italic text-base sm:text-lg text-ink-secondary leading-relaxed">
            A comprehensive masterclass on translating raw satellite thermal infrared pixels into audit-ready municipal resilience capital.
          </p>

          {/* Quick Jump Links */}
          <div className="flex items-center gap-2 pt-3 flex-wrap">
            <span className="text-xs text-ink-muted mr-1">Quick Jump:</span>
            {[
              { label: 'The Problem', href: '#problem' },
              { label: 'Domain Physics & Math', href: '#physics' },
              { label: 'Architecture & Data Flow', href: '#architecture' },
              { label: 'Stakeholders & Personas', href: '#stakeholders' },
              { label: 'Consulting Valuation ($100k+)', href: '#consulting' },
              { label: 'Admissions & Career Moat', href: '#careers' },
              { label: 'Prompt Library', href: '#prompts' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs bg-card-subtle text-ink-secondary hover:text-ink-primary hover:bg-card-floating border border-hairline transition-all"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Ambient Botanical / Thermal Decoration */}
        <div className="absolute -right-12 -bottom-12 w-96 h-96 rounded-full bg-gradient-to-br from-canopy-tint/50 via-card-subtle to-heat-tint/30 blur-3xl pointer-events-none" />
      </div>

      {/* SECTION 1: THE CORE PROBLEM */}
      <section id="problem" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-heat-tint text-heat-severe flex items-center justify-center font-serif text-sm font-bold">
            01
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            The Real-World Business & Climate Crisis
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card rounded-3xl p-6 sm:p-8 border border-hairline shadow-editorial space-y-4">
            <h3 className="font-serif text-xl font-normal text-ink-primary">
              The $5 Billion Spatial Compliance Bottleneck
            </h3>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Every summer, American metropolitan regions turn into acute thermal pressure cookers. Decades of discriminatory urban planning, redlining, and asphalt-heavy zoning turned low-income neighborhoods into <strong className="text-ink-primary">Urban Heat Islands (UHIs)</strong>. Pavement absorbs up to 95% of incoming solar radiation, elevating localized surface temperatures by up to <strong className="text-heat-severe">+15°F</strong> over nearby tree-lined suburbs and causing preventable heat stroke, cardiovascular stress, and pediatric asthma spikes.
            </p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Under federal statutes like the <strong className="text-canopy-deep">Justice40 Initiative</strong> and the <strong className="text-canopy-deep">USDA Forest Service Urban & Community Forestry (IRA)</strong> program, billions of dollars in grants are available. However, 40% to 100% of awarded funding must legally benefit verified disadvantaged census tracts.
            </p>
            <div className="bg-heat-tint/70 rounded-2xl p-4 border border-heat-terracotta/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-heat-severe">
                <AlertTriangle className="w-4 h-4" />
                <span>The Deadlock Faced by Non-Profits & Small Cities</span>
              </div>
              <p className="text-xs text-heat-terracotta leading-relaxed">
                Applying for these funds requires mathematically rigorous proof: calibrated Land Surface Temperature (LST) anomalies, canopy deficits, and projected cooling return-on-investment. Understaffed municipal offices cannot afford specialized GIS engineering teams or five-figure ESRI licenses. They take 60 to 90 business days manually assembling data—frequently missing funding deadlines—or submit vague applications that fail scientific federal review.
              </p>
            </div>
          </div>

          <div className="bg-card-subtle/80 rounded-3xl p-6 border border-hairline flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono-numbers uppercase tracking-wider text-ink-muted">Impact Scorecard</span>
              <h4 className="font-serif text-lg text-ink-primary mt-1">Why Manual GIS Fails</h4>
            </div>

            <div className="space-y-3 font-mono-numbers text-xs">
              <div className="bg-card-floating p-3 rounded-2xl border border-hairline">
                <div className="text-ink-muted text-[11px]">Legacy GIS Consulting Fee</div>
                <div className="text-base font-bold text-heat-severe">$15,000 – $40,000</div>
                <div className="text-[10px] text-ink-muted mt-0.5">Per single grant proposal cycle</div>
              </div>

              <div className="bg-card-floating p-3 rounded-2xl border border-hairline">
                <div className="text-ink-muted text-[11px]">Turnaround Delay</div>
                <div className="text-base font-bold text-heat-amber">60 to 90 Days</div>
                <div className="text-[10px] text-ink-muted mt-0.5">High risk of missing federal deadlines</div>
              </div>

              <div className="bg-card-floating p-3 rounded-2xl border border-hairline">
                <div className="text-ink-muted text-[11px]">Our Automated Pipeline</div>
                <div className="text-base font-bold text-canopy-deep">&lt; 30 Seconds</div>
                <div className="text-[10px] text-canopy-accent mt-0.5">Instant, audit-ready Justice40 compliance brief</div>
              </div>
            </div>

            <button
              onClick={() => onSwitchTab('map')}
              className="w-full py-2.5 rounded-2xl bg-canopy-deep text-canvas text-xs font-medium hover:bg-canopy-deep/90 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Active Heat Corridors</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: DOMAIN KNOWLEDGE & SCIENTIFIC PHYSICS */}
      <section id="physics" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-canopy-tint text-canopy-deep flex items-center justify-center font-serif text-sm font-bold">
            02
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            The Geospatial Physics & Mathematics Students Must Know
          </h2>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-hairline shadow-editorial space-y-6">
          <p className="text-sm text-ink-secondary leading-relaxed max-w-3xl">
            To build a tool that municipal leaders and federal grant reviewers take seriously, you cannot use arbitrary numbers or fake scores. You must implement the accepted physical equations of satellite remote sensing and urban forestry biophysics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            {/* Concept 1: Ambient vs LST */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-heat-tint text-heat-terracotta flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                1. Ambient Air Temp vs. LST
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Weather apps display regional air temperature measured 2 meters above ground in open, ventilated airport fields. <strong className="text-ink-primary">Land Surface Temperature (LST)</strong> measures the physical contact temperature of roofs and asphalt, which routinely exceeds <strong className="text-heat-severe">140°F</strong> on 88°F afternoons.
              </p>
            </div>

            {/* Concept 2: NDVI Formula */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-canopy-tint text-canopy-deep flex items-center justify-center">
                <TreePine className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                2. Normalized Difference Vegetation (NDVI)
              </h4>
              <div className="bg-card-subtle px-2.5 py-1.5 rounded-xl font-mono-numbers text-xs text-canopy-deep font-semibold text-center">
                NDVI = (NIR - Red) / (NIR + Red)
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Exploits chlorophyll absorption in Red light (Landsat Band 4) and leaf cell reflectance in Near-Infrared (Band 5). Dense canopies score &gt;0.45; baked pavement scores &lt;0.12.
              </p>
            </div>

            {/* Concept 3: Planck's Radiance & Emissivity */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-canopy-tint text-canopy-deep flex items-center justify-center">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                3. Planck's Law & Emissivity (ε)
              </h4>
              <div className="bg-card-subtle px-2.5 py-1.5 rounded-xl font-mono-numbers text-xs text-ink-primary font-semibold text-center">
                ε = 0.004 × P_v + 0.986
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Converts raw Top of Atmosphere (TOA) spectral radiance from Landsat Band 10 into Brightness Temperature (T_B), then adjusts for surface emissivity (ε) based on vegetation proportion (P_v).
              </p>
            </div>

            {/* Concept 4: Zonal Statistics */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-card-subtle text-ink-primary flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                4. Zonal Spatial Reductions
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Satellites produce continuous 30-meter pixel grids. Zonal statistics overlay administrative polygon boundaries (Census Tracts, City Council Districts) and compute zonal mean, median, and 90th-percentile heat burden.
              </p>
            </div>

            {/* Concept 5: Biophysical Cooling Coefficient */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-canopy-tint text-canopy-deep flex items-center justify-center">
                <Activity className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                5. The 0.38°F / 1% Canopy Rule
              </h4>
              <div className="bg-card-subtle px-2.5 py-1.5 rounded-xl font-mono-numbers text-xs text-canopy-deep font-semibold text-center">
                ΔT = ΔCanopy% × 0.38°F × f_impervious
              </div>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Derived from peer-reviewed urban forestry empirical regressions. Each 1% added canopy yields ~0.38°F surface cooling via leaf shading and active evapotranspirative heat extraction.
              </p>
            </div>

            {/* Concept 6: 3-30-300 Benchmark */}
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2">
              <div className="w-8 h-8 rounded-xl bg-card-subtle text-ink-primary flex items-center justify-center">
                <Globe2 className="w-4 h-4" />
              </div>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                6. The 3-30-300 Urban Forestry Rule
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                The global evidence-backed benchmark: Every resident must see at least <strong className="text-ink-primary">3 trees</strong> from their window, live in a neighborhood with <strong className="text-ink-primary">30% canopy cover</strong>, and be within <strong className="text-ink-primary">300 meters</strong> of a quality park.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: ARCHITECTURE & DATA FLOW */}
      <section id="architecture" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-card-subtle text-ink-primary flex items-center justify-center font-serif text-sm font-bold">
            03
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            High-Level Data Flow & Systems Architecture
          </h2>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-hairline shadow-editorial space-y-6">
          <p className="text-sm text-ink-secondary leading-relaxed">
            The application follows a clean, decoupled geospatial pipeline. Instead of forcing clients to download gigabytes of heavy GeoTIFF rasters, pre-calibrated zonal vectors are served directly to the browser for instant client-side reactivity.
          </p>

          {/* Interactive Flow Stepper */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2 relative">
              <div className="text-[11px] font-mono-numbers uppercase tracking-wider text-canopy-accent font-semibold">Stage 1</div>
              <h4 className="font-serif text-base text-ink-primary">Data Ingestion</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                USGS Landsat 8/9 ST_B10 thermal radiance combined with Socrata Open Data tree censuses and US Census Bureau TIGER/Line tract geometries.
              </p>
              <div className="text-[11px] font-mono-numbers text-ink-muted pt-2 border-t border-hairline">
                Sources: GEE, SODA, CEJST
              </div>
            </div>

            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2 relative">
              <div className="text-[11px] font-mono-numbers uppercase tracking-wider text-heat-amber font-semibold">Stage 2</div>
              <h4 className="font-serif text-base text-ink-primary">Zonal Reductions</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Spatial polygon intersection calculates tract mean LST, municipal baseline delta, tree count, impervious surface %, and poverty rate.
              </p>
              <div className="text-[11px] font-mono-numbers text-ink-muted pt-2 border-t border-hairline">
                Math: NDVI, Planck, Emissivity
              </div>
            </div>

            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2 relative">
              <div className="text-[11px] font-mono-numbers uppercase tracking-wider text-canopy-deep font-semibold">Stage 3</div>
              <h4 className="font-serif text-base text-ink-primary">Simulation Engine</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Reactive client-side biophysical model updates projected LST, avoided annual cooling degree hours, and moisture relief as users pull the slider.
              </p>
              <div className="text-[11px] font-mono-numbers text-ink-muted pt-2 border-t border-hairline">
                Latency: &lt;16ms (Zero Jitter)
              </div>
            </div>

            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2 relative">
              <div className="text-[11px] font-mono-numbers uppercase tracking-wider text-heat-severe font-semibold">Stage 4</div>
              <h4 className="font-serif text-base text-ink-primary">Compliance Output</h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Parchment cartography, Recharts statistical scatter plots, and instant 1-page printable Justice40 grant brief ready for PDF export.
              </p>
              <div className="text-[11px] font-mono-numbers text-ink-muted pt-2 border-t border-hairline">
                Output: @media print / Markdown
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: STAKEHOLDERS & USERS */}
      <section id="stakeholders" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-canopy-tint text-canopy-deep flex items-center justify-center font-serif text-sm font-bold">
            04
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            Target Stakeholders: Who Uses This App & How
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="bg-card rounded-3xl p-6 border border-hairline shadow-editorial space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-canopy-deep text-canopy-tint flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink-primary">Municipal Sustainability Officers</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              <strong>Workflow:</strong> Evaluates city-wide heat disparities, isolates the top 3 critical priority tracts, and tests intervention scenarios to decide where to invest urban forestry budget.
            </p>
            <div className="text-[11px] font-mono-numbers text-canopy-accent">
              Benefit: Defensible spatial budget allocation
            </div>
          </div>

          <div className="bg-card rounded-3xl p-6 border border-hairline shadow-editorial space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-heat-severe text-canvas flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink-primary">Environmental Justice Non-Profits</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              <strong>Workflow:</strong> Grassroots coalitions in redlined areas generate peer-reviewed data packets in 30 seconds to support grant applications for pocket parks and street trees.
            </p>
            <div className="text-[11px] font-mono-numbers text-heat-severe">
              Benefit: Eliminates GIS consultant costs
            </div>
          </div>

          <div className="bg-card rounded-3xl p-6 border border-hairline shadow-editorial space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-card-subtle text-ink-primary flex items-center justify-center">
              <GraduationCap className="w-5 h-5" />
            </div>
            <h4 className="font-serif text-lg text-ink-primary">Federal & State Grant Reviewers</h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              <strong>Workflow:</strong> Standardizes application compliance. Reviewers verify satellite sensor timestamps, baseline anomalies, and empirical cooling projections in a consistent audit-ready format.
            </p>
            <div className="text-[11px] font-mono-numbers text-ink-muted">
              Benefit: Faster, error-free grant awards
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 5: COMMERCIAL CONSULTING VALUATION */}
      <section id="consulting" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-heat-tint text-heat-severe flex items-center justify-center font-serif text-sm font-bold">
            05
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            Commercial Valuation: What External Consulting Firms Charge
          </h2>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-hairline shadow-editorial space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-hairline pb-5">
            <div>
              <h3 className="font-serif text-xl text-ink-primary">Enterprise Spatial Engagement Benchmark</h3>
              <p className="text-xs text-ink-secondary mt-0.5">
                Typical billable breakdown from top-tier environmental / GIS engineering consultancies (e.g., AECOM, Arup, ERM, ESRI Partners).
              </p>
            </div>
            <div className="text-left lg:text-right font-mono-numbers">
              <span className="text-xs text-ink-muted">Commercial Market Value</span>
              <div className="text-2xl sm:text-3xl font-bold text-heat-severe">$76,000 – $128,000</div>
              <span className="text-[11px] text-ink-muted">Timeline: 12 to 16 Weeks</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="bg-card-floating p-4 rounded-2xl border border-hairline space-y-1.5">
              <div className="font-serif font-medium text-ink-primary text-sm">1. Spatial Data Ingestion</div>
              <div className="font-mono-numbers font-semibold text-ink-primary">$18,000 – $25,000</div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Downloading Landsat rasters, atmospheric calibration, cloud-masking, and cleaning municipal LiDAR tree files.
              </p>
            </div>

            <div className="bg-card-floating p-4 rounded-2xl border border-hairline space-y-1.5">
              <div className="font-serif font-medium text-ink-primary text-sm">2. Zonal Reductions Engine</div>
              <div className="font-mono-numbers font-semibold text-ink-primary">$22,000 – $32,000</div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Python/PostGIS raster-to-polygon join, baseline normalization, and statistical disparity calculations.
              </p>
            </div>

            <div className="bg-card-floating p-4 rounded-2xl border border-hairline space-y-1.5">
              <div className="font-serif font-medium text-ink-primary text-sm">3. UI/UX & Web GIS Frontend</div>
              <div className="font-mono-numbers font-semibold text-ink-primary">$24,000 – $38,000</div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Custom editorial design system, Leaflet/Mapbox cartography, reactive What-If sliders, and Recharts analytics.
              </p>
            </div>

            <div className="bg-card-floating p-4 rounded-2xl border border-hairline space-y-1.5">
              <div className="font-serif font-medium text-ink-primary text-sm">4. Policy Brief Automation</div>
              <div className="font-mono-numbers font-semibold text-ink-primary">$12,000 – $18,000</div>
              <p className="text-[11px] text-ink-muted leading-relaxed">
                Automated statutory language insertion, PDF print formatting, and Justice40 compliance matrices.
              </p>
            </div>
          </div>

          {/* Micro-SaaS Business Model */}
          <div className="bg-canopy-tint/50 rounded-2xl p-5 border border-canopy-sage/20 space-y-2">
            <h4 className="font-serif text-base font-medium text-canopy-deep">
              The Micro-SaaS Business Angle: Grant Acceleration as a Service
            </h4>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Instead of selling complex GIS software licenses to non-profits with no budget, package the output into <strong className="text-ink-primary">Federal Evidence Dossiers</strong> sold for <strong className="text-canopy-deep">$499 per grant application</strong> or a <strong className="text-canopy-deep">$4,990/year municipal subscription</strong>. Because winning a single USDA forestry grant awards $500,000 to $2,000,000, the product yields an immediate <strong>100x return on investment (ROI)</strong> for applicants.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: COLLEGE APPLICATION & CAREER DIFFERENTIATION */}
      <section id="careers" className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-canopy-tint text-canopy-deep flex items-center justify-center font-serif text-sm font-bold">
            06
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            How This Project Differentiates You in College Admissions & Tech Interviews
          </h2>
        </div>

        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-hairline shadow-editorial space-y-6">
          <p className="text-sm text-ink-secondary leading-relaxed">
            Admissions officers at top universities (MIT, Stanford, Ivies, UC Berkeley) and tech hiring managers evaluate thousands of generic portfolios filled with identical todo apps, weather widgets, and clone apps. Here is why this project stands out in the top 1%:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-canopy-tint text-canopy-deep flex items-center justify-center text-xs font-mono-numbers font-bold">
                A
              </span>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                True Interdisciplinary Depth
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                You aren't just writing JavaScript. You are synthesizing <strong>Computer Science</strong> (TypeScript, vector math), <strong>Earth Science</strong> (Planck radiance, emissivity, remote sensing), and <strong>Public Policy</strong> (Justice40, environmental justice).
              </p>
            </div>

            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-heat-tint text-heat-severe flex items-center justify-center text-xs font-mono-numbers font-bold">
                B
              </span>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                Real Societal Impact (SDG 11)
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Connects software directly to a physical world crisis: historic redlining and extreme heat mortality. It demonstrates empathy, systems thinking, and purpose-driven engineering.
              </p>
            </div>

            <div className="bg-card-floating rounded-2xl p-5 border border-hairline space-y-2.5">
              <span className="w-7 h-7 rounded-full bg-card-subtle text-ink-primary flex items-center justify-center text-xs font-mono-numbers font-bold">
                C
              </span>
              <h4 className="font-serif text-base font-medium text-ink-primary">
                Production-Grade Polish
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Zero default bootstrap looks. Features bespoke editorial design tokens (*Canopy & Clay*), tabular mono non-jittering figures, and responsive `@media print` engineering.
              </p>
            </div>

          </div>

          {/* Copyable Resume Bullet Points */}
          <div className="bg-card-subtle rounded-2xl p-5 border border-hairline space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono-numbers uppercase tracking-wider text-ink-muted">
                Ready-to-Use Resume / Common App Bullets:
              </span>
            </div>
            <div className="space-y-2 font-mono-numbers text-xs text-ink-secondary bg-card-floating p-4 rounded-xl border border-hairline">
              <p>
                • Architected an open-access climate intelligence platform (UN SDG 11) converting satellite thermal infrared radiance (Landsat 9 Band 10) into calibrated Land Surface Temperature anomalies for 20+ urban census tracts.
              </p>
              <p>
                • Engineered a client-side biophysical simulation engine calculating real-time temperature reductions (0.38°F/1% canopy) and avoided cooling degree hours across high-density urban corridors.
              </p>
              <p>
                • Automated federal Justice40 statutory grant evidence dossiers, replacing 60-day manual GIS consulting workflows with an audit-ready, 30-second print-formatted spatial packet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FUTURE ENHANCEMENTS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-2xl bg-card-subtle text-ink-primary flex items-center justify-center font-serif text-sm font-bold">
            07
          </span>
          <h2 className="font-serif text-2xl font-normal text-ink-primary">
            Future Enhancements & Production Roadmap
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-2xl p-5 border border-hairline shadow-editorial space-y-2">
            <div className="text-xs font-semibold text-canopy-deep">1. Live STAC Satellite Stream</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Connect directly to AWS Earth Search STAC catalog for real-time 16-day Landsat 8/9 Level-2 scene updates.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-hairline shadow-editorial space-y-2">
            <div className="text-xs font-semibold text-heat-severe">2. Computer Vision Tree Crowns</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Train a lightweight YOLO/Segment Anything model on 1-meter aerial NAIP imagery to count individual street tree canopies.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-hairline shadow-editorial space-y-2">
            <div className="text-xs font-semibold text-canopy-accent">3. Mobile IoT Ground-Truthing</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Integrate citizen-science thermal sensors mounted on municipal buses and bicycles via LoRaWAN/MQTT feeds.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-5 border border-hairline shadow-editorial space-y-2">
            <div className="text-xs font-semibold text-ink-primary">4. 40-Year Warming Trends</div>
            <p className="text-xs text-ink-secondary leading-relaxed">
              Ingest historical Landsat 5 (1984) to Landsat 9 (2024) to visualize 4-decade expansion of urban heat islands.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: INTERACTIVE PROMPT ENGINEERING LIBRARY */}
      <section id="prompts" className="space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-2xl bg-canopy-deep text-canvas flex items-center justify-center font-serif text-sm font-bold">
              08
            </span>
            <div>
              <h2 className="font-serif text-2xl font-normal text-ink-primary">
                Prompt Engineering Library & Build Log
              </h2>
              <p className="text-xs text-ink-muted">
                Copy and run the exact prompt sequences used to architect and construct this application
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center bg-card p-1 rounded-2xl border border-hairline text-xs">
            {['All', 'Foundation', 'Simulation', 'Evidence', 'APIs', 'Analytics'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-xl transition-all font-medium ${
                  selectedCategory === cat
                    ? 'bg-card-floating text-ink-primary shadow-sm font-semibold'
                    : 'text-ink-secondary hover:text-ink-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredPrompts.map((card) => {
            const isCopied = copiedId === card.id;
            return (
              <div
                key={card.id}
                className="bg-card rounded-3xl p-5 sm:p-6 border border-hairline shadow-editorial space-y-4 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-card-subtle text-ink-secondary border border-hairline font-mono-numbers">
                      {card.tier}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-canopy-tint text-canopy-deep">
                      {card.category}
                    </span>
                    <h3 className="font-serif text-lg font-medium text-ink-primary">
                      {card.title}
                    </h3>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(card.id, card.promptText)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isCopied
                        ? 'bg-canopy-deep text-canvas shadow-sm'
                        : 'bg-card-floating text-ink-primary border border-hairline hover:bg-card-subtle'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-canopy-tint" />
                        <span>Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-ink-muted" />
                        <span>Copy Prompt</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-ink-secondary leading-relaxed">
                  {card.description}
                </p>

                {/* Prompt Code Box */}
                <div className="relative bg-card-subtle/80 rounded-2xl p-4 border border-hairline font-mono-numbers text-xs text-ink-primary overflow-x-auto max-h-72 overflow-y-auto scrollbar-thin">
                  <pre className="whitespace-pre-wrap leading-relaxed font-mono">
                    {card.promptText}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA to Return to Map */}
      <div className="rounded-3xl bg-canopy-deep p-8 text-center text-canvas space-y-3 shadow-editorial">
        <h3 className="font-serif text-2xl font-normal">Ready to Test the Live Thermal Engine?</h3>
        <p className="text-xs text-canopy-tint max-w-xl mx-auto leading-relaxed">
          Switch to the interactive cartography map to inspect real-time Land Surface Temperature anomalies and simulate tree canopy cooling across South Bronx, Chicago, and Philadelphia.
        </p>
        <button
          onClick={() => onSwitchTab('map')}
          className="mt-2 inline-flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-canvas text-canopy-deep font-semibold text-xs hover:bg-canopy-tint transition-all shadow-md"
        >
          <span>Launch Interactive Cartography</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
