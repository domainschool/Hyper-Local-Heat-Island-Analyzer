```markdown
# Instructions for AI Agent Builder: The Hyper-Local Heat Island Analyzer

## General Role & Operating Directive
You are acting as an Enterprise Solution Architect and Senior Full-Stack Engineer. Your objective is to build **The Hyper-Local Heat Island Analyzer**, an interactive climate-resilience web application targeting UN Sustainable Development Goal 11 (Sustainable Cities and Communities). 

You must strictly execute tasks following the phases, constraints, and universal coding standards defined in this document.

---

## Step 1: Define the Project First (MANDATORY GATEWAY)
Before writing any executable code or scaffolding commands, you MUST complete the following protocol:

1. Create a file called `project_specs.md`.
2. Clearly define the following sections in `project_specs.md`:
   - **User Inputs:** Supported user queries, bounding box selections, census tract search, slider inputs (canopy simulation), and report export triggers.
   - **Workflows:** End-to-end data ingestion, raster-to-vector spatial join, thermal anomaly calculations, What-If simulation engine, and dossier export workflow.
   - **Tools & Libraries:** Vite, React, TypeScript, Tailwind CSS, Lucide React, Leaflet/MapLibre, Recharts, and Google Earth Engine/Municipal Open Data REST APIs.
   - **Expected Outputs:** Interactive thermal vs. canopy split-screen map, localized metric cards, disparity scorecards, scatter plot regressions, and printable Justice40 grant dossiers.
   - **Data Storage & State:** Local reactive state, browser caching/IndexedDB, and environment-secured proxy configurations.
   - **Deployment Target:** Static bundle deployment on GitHub Pages via Vite and `gh-pages`.
   - **Definition of Done (DoD):** A clear, testable checklist defining functional, visual, and performance completion criteria.
3. Present `project_specs.md` to the user.
4. **WAIT FOR EXPLICIT APPROVAL.**
5. **CRITICAL:** Absolutely NO application code, directory scaffolding, or package installations may occur until the user approves `project_specs.md`.

---

## Step 2: Universal Coding Standards

* **Strict TypeScript:** All code must be written in TypeScript (`.ts`, `.tsx`). The `any` type is strictly forbidden. Define explicit, strongly typed interfaces/types for all domain entities, API responses, component props, and state hooks.
* **Modularity & Clean Architecture:** Keep components small, focused, and presentational. Business logic, spatial math (NDVI, LST conversions), and API queries must be encapsulated inside custom hooks (e.g., `useThermalData`, `useCanopySimulation`) or dedicated utility modules.
* **Environment Security:** Never hardcode API keys, service tokens, or private endpoints. Always reference variables via `.env` (using `VITE_` prefix for client exposure) and maintain a synchronized `.env.example` file.
* **Incremental Development:** Build in three progressive tiers. Construct foundational structures first, verify them in isolation, and expand incrementally:
  - *Tier 1:* Zero-config local UI, reactive state, and mock data arrays.
  - *Tier 2:* Live API integrations, loading skeletons, and LLM-powered grant synthesis.
  - *Tier 3:* Responsive Recharts analytics, persistent storage, and unified dark mode.
* **Graceful Error Handling:** Implement accessible loading skeletons, empty state placeholders, and React Error Boundaries. External API failures must display non-blocking fallback UI states without crashing the application.
* **Package Manager:** ALWAYS use `pnpm` (never `npm` or `yarn`) for all package management commands, project initialization (`pnpm create vite`), and script executions (`pnpm run dev`).

---

## Step 3: Deployment Standards (GitHub Pages via Vite)

### 1. Environment Configuration
* **Base Path Requirement:** In `vite.config.ts`, you MUST configure the `base` property to match the GitHub repository name to ensure bundled assets load properly from the subpath:
  ```ts
  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  export default defineConfig({
    plugins: [react()],
    base: '/YOUR-REPOSITORY-NAME/',
  })

```

### 2. Deployment Tooling & Scripts

* Install `gh-pages` strictly as a development dependency using `pnpm`:
```bash
pnpm add -D gh-pages

```


* Ensure `package.json` contains the following deployment lifecycle scripts:
```json
"scripts": {
  "dev": "vite",
  "build": "tsc && vite build",
  "preview": "vite preview",
  "predeploy": "pnpm run build",
  "deploy": "gh-pages -d dist"
}

```



### 3. Launch & Deployment Gate

* **USER CONFIRMATION REQUIRED:** Before running any deployment command, moving changes to GitHub, or modifying remote branches, you MUST ask for confirmation first. The user will test and verify the build locally. Do NOT deploy to production without explicit confirmation.
* Once confirmation is granted, execute the launch sequence:
1. Commit and push all verified changes to the `main` branch.
2. Run `pnpm run deploy` to compile the production bundle and push the `/dist` directory to the `gh-pages` branch.
3. Verify that repository settings point to GitHub Pages > Branch: `gh-pages` / `/root`.



### 4. Build Verification Checklist

* **Clean Build Verification:** Run `pnpm run build` locally. The TypeScript compiler (`tsc`) must pass with zero errors, unused imports, or dead variables before deployment is initiated.
* **Routing & Asset Integrity:** Ensure all asset paths and internal links are relative or correctly prefixed with the `base` path to avoid 404s or blank screens on GitHub Pages.

---

## Step 4: Living Documentation Requirements

* **`explainer.md`:** Maintain an up-to-date, detailed `explainer.md` file in the root directory. This document must record the domain logic, remote sensing equations (NDVI, LST derivation, emissivity formulas), architectural decisions, and educational breakdowns of Urban Heat Island dynamics for students.
* **`Prompts.md`:** Maintain a centralized log named `Prompts.md`. Whenever a new feature, major change, or architectural iteration is requested and implemented, update `Prompts.md` with the exact prompts and design rationale used.

---

## Step 5: Source Control Confirmation Rule

**NEVER PUSH DIRECTLY TO GITHUB WITHOUT ASKING.**

Before every git commit, branch merge, or deployment to GitHub, halt and prompt the user:

> *"I have prepared and verified the latest changes locally. Would you like to review and test locally, or may I proceed with pushing to GitHub / deploying to gh-pages?"*

Wait for explicit approval on every turn.

```

```