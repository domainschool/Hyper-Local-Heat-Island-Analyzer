## Tier 1: MVP 1 (Zero-Config Scaffolding & Local Reactive UI)

### Prompt 1.1: Project Setup, Component Architecture & Mock Dataset

```text
Act as a Senior Frontend Architect. We are building the frontend MVP for "The Hyper-Local Heat Island Analyzer" (Targeting UN SDG 11: Sustainable Cities). 
Initialize a Next.js (App Router), Tailwind CSS, and Lucide React application with a zero-config, client-side setup.

1. Create a strongly typed TypeScript interface `TractData` with the following attributes:
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
   - Set up React state `selectedTract` initialized to the first tract in the mock array. Clicking any tract on the map or list must instantly update the state and the detail card without page reload.

```

### Prompt 1.2: Interactive Side-by-Side Swipe & Metric Cards

```text
Enhance the Tier 1 MVP UI by adding two key components in the right-hand inspection view:

1. Create a "Canopy vs. Thermal Delta" comparative split card:
   - Display two prominent circular progress/stat meters:
     a) "Surface Heat Delta" (colored red with flame icon, showing degrees above municipal average).
     b) "Tree Canopy Cover" (colored emerald with tree icon, showing current % vs. the 30% standard target).
   - Add a dynamic badge: If canopyCoverPct < 15% AND avgLST_F > 95°F, render an alert badge: "CRITICAL INTERVENTION ZONE".

2. Build a local What-If Slider component ("Tree Canopy Intervention Simulator"):
   - A slider ranging from 0% to +30% additional canopy cover.
   - State formula: calculate an estimated temperature reduction:
     `projectedLST = tract.avgLST_F - (addedCanopyPct * 0.38)`
   - Show dynamic live updates: as the user drags the slider, show the new projected surface temperature, the degrees cooled, and an estimated "Heat Vulnerability Score" reduction in real-time.
   - Ensure the UI contains no external API calls and runs entirely on local React state.

```

### Prompt 1.3: Client-Side Grant Dossier Exporter (Zero-Backend)

```text
Complete the MVP 1 tier by adding a client-side "Grant Evidence Quick-Export" modal:

1. Add a primary CTA button: "Generate 1-Page Grant Evidence Sheet" on the Tract Detail Card.
2. When clicked, open a styled modal displaying an audit-ready grant brief with:
   - Header: "Justice40 & Federal Urban Forestry Compliance Brief"
   - Metadata: Census Tract ID, FIPS Code, and Timestamp.
   - Executive Summary: A templated paragraph inserting the tract's local stats:
     "Tract [name] exhibits an average Land Surface Temperature of [avgLST_F]°F during peak summer conditions, representing a [cityBaselineDelta]°F anomaly above the municipal baseline. With current tree canopy at [canopyCoverPct]%, this tract qualifies under priority environmental justice funding criteria."
   - 3-point bulleted breakdown: Thermal Burden, Canopy Deficit, and Population Vulnerability.
   - Print/Save button triggering `window.print()` with a `@media print` Tailwind utility that hides the dashboard background and formats only the clean white grant dossier sheet.

```

---

## Tier 2: MVP 2 (Live API Integrations, Server-Side Endpoints & LLM Synthesis)

### Prompt 2.1: Server-Side Geospatial API Ingestion & Loading States

```text
Transition the project from mock arrays to a live server-side data pipeline. Configure Next.js Route Handlers (`app/api/spatial/route.ts`) and environment variables (`.env.local`):

1. Set up an environment variable: `MUNICIPAL_DATA_API_KEY` (support NYC OpenData SODA API / Socrata).
2. Write a server-side route `/api/spatial?bbox=[minLng,minLat,maxLng,maxLat]` that:
   - Fetches live GeoJSON polygons of neighborhood boundaries or census tracts.
   - Concurrently fetches street tree density or municipal canopy coverage data.
   - Implements resilient error handling, standard HTTP status codes, and an in-memory or Next.js fetch cache with a 1-hour `revalidate` tag.
3. In the frontend, replace the static mock map with an asynchronous SWR or React Query hook.
4. Implement realistic UI skeleton states:
   - Render shimmering Tailwind skeleton loaders for the map viewport, metric cards, and tract lists while data is fetching.
   - Handle empty states, network timeouts, and display an error toast if the external API rate limit is reached.

```

### Prompt 2.2: Live Remote Sensing Computation via Google Earth Engine / STAC

```text
Integrate live Earth Observation data processing into our server backend:

1. Create a dedicated backend service `/api/thermal-indices`:
   - Accept query parameters: `lat`, `lng`, `startDate`, `endDate`.
   - Connect to a public STAC (SpatioTemporal Asset Catalog) API (e.g., Earth Search on AWS or Google Earth Engine Python/Node wrapper via service account credentials).
   - Ingest Landsat 8/9 Level-2 Surface Temperature (Band ST_B10) and Surface Reflectance (Red Band 4, NIR Band 5).
   - Calculate the mean NDVI and mean LST for the designated bounding box over the cloud-free summer window.
   - Convert raw Kelvin outputs to Fahrenheit: `(Kelvin - 273.15) * 9/5 + 32`.
2. Secure all Earth Engine or STAC credentials in `.env.local` (`GEE_PRIVATE_KEY`, `GEE_CLIENT_EMAIL`). Never expose keys to the client browser.
3. Update the client UI to display the satellite capture timestamp, cloud cover percentage metadata, and a toggle between "Live Satellite TIR" and "Municipal Canopy" layers.

```

### Prompt 2.3: Generative AI Grant Dossier Engine (Gemini / OpenAI API)

```text
Upgrade the static grant modal into an automated AI Policy Writer powered by an LLM (Gemini 1.5 Pro / OpenAI GPT-4o) using official SDKs:

1. Create a POST endpoint `/api/generate-dossier` protected by server-side validation:
   - Ingest the selected tract payload: `{ tractName, fipsCode, avgLST, delta, canopyPct, povertyPct, simulatedCanopyAddition }`.
   - Call the LLM with a structured system prompt acting as a Senior Environmental Policy Analyst and Federal Grant Strategist.
   - Enforce structured JSON output containing:
     - `executiveSummary`: Formal narrative citing Justice40 criteria.
     - `statJustification`: 3 quantitative arguments correlating heat disparity with lack of canopy.
     - `proposedIntervention`: Projected impact of planting target trees.
     - `recommendedGrantPrograms`: List of 2 matching federal/state grants (e.g., USDA Urban & Community Forestry, EPA MACA).
2. In the UI:
   - Add a button: "Generate AI Policy Proposal".
   - Render a streaming text response or real-time typing state.
   - Allow users to edit the generated sections inline before triggering a one-click PDF/Markdown export.

```

---

## Tier 3: Enterprise Scale (Persistence, Auth Guardrails, Advanced Analytics & Theming)

### Prompt 3.1: Persistent Database Layer & Schema Migrations (Supabase/PostgreSQL)

```text
Architect a persistent data and organization management layer using Supabase (PostgreSQL) and Prisma or Drizzle ORM:

1. Write the database schema migration:
   - `organizations`: id, name, slug, plan ('free' | 'pro' | 'enterprise'), created_at.
   - `users`: id, org_id, email, role ('viewer' | 'analyst' | 'admin').
   - `tract_bookmarks`: id, user_id, org_id, fips_code, custom_name, notes, pinned_at.
   - `dossier_reports`: id, org_id, user_id, fips_code, title, llm_generated_content (JSONB), simulation_params (JSONB), pdf_url, created_at.
   - `spatial_tract_cache`: fips_code, geometry (PostGIS geometry or GeoJSON), precomputed_lst, precomputed_canopy, last_satellite_sync.

2. Enable Row Level Security (RLS) policies:
   - Users can only read and write dossiers and bookmarks belonging to their own `org_id`.
   - Admins can invite team members and modify organization details.
3. Provide database seed scripts containing benchmark baseline statistics for standard urban areas so the database works out-of-the-box upon deployment.

```

### Prompt 3.2: Middleware Route Guards, Auth, & Enterprise Role-Based Access Control

```text
Implement production-grade authentication and route security:

1. Configure Supabase Auth or Clerk with Next.js Middleware (`middleware.ts`):
   - Protect all application routes under `/dashboard/*`, `/reports/*`, and `/api/enterprise/*`.
   - Redirect unauthenticated users to `/login`.
   - Handle session refresh tokens, secure HTTP-only cookies, and CSRF protection.
2. Build an RBAC (Role-Based Access Control) utility:
   - `Viewer`: Can explore maps, toggle simulation sliders, and view generated reports.
   - `Analyst`: Can trigger live satellite re-syncs, run What-If simulations, and generate new AI dossiers.
   - `Admin`: Can manage organization API keys, add team members, and view data consumption/billing limits.
3. Build a Team Workspace switcher in the top navigation bar showing current organization context, member role, and an enterprise seat count indicator.

```

### Prompt 3.3: Recharts Comparative Analytics, Heat Disparity Curves & Unified Dark Mode

```text
Upgrade the visual and analytical UX to enterprise standard:

1. Implement Responsive Data Visualizations using `recharts`:
   - **Canopy vs. Temperature Scatter Plot**: Plot all city tracts on an interactive scatter graph (X-axis: Canopy Cover %, Y-axis: Surface Temp °F). Highlight the selected tract with a distinctive animated marker and draw the linear regression trend line to visualize the inverse correlation.
   - **Diurnal Heat Retention Bar Chart**: Show 24-hour heat dissipation curves comparing asphalt-dense tracts vs. park-adjacent tracts to illustrate nighttime heat traps.
2. Implement an Enterprise-Grade Theme Engine:
   - Configure Tailwind dark mode with CSS variables and `next-themes`.
   - Provide a persistent Dark/Light mode toggle in the global navbar.
   - Ensure high-contrast data visualization palettes in both modes (e.g., optimized color-blind friendly thermal ramps for satellite layers and high-contrast cartographic basemaps).
3. Ensure all charts and maps are mobile-responsive with viewport-aware auto-resizing containers and accessible ARIA attributes.

```