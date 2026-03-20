# Girdwood Research Archive

This repository is a primary source archive for research on political, economic, and housing issues in Girdwood, Alaska. It preserves documents that may disappear from the web, and serves as a single compendium for downstream research.

## Repository Conventions

### Source IDs
Format: `{YYYY-MM-DD}-{short-slug}` — date-first for sort order, slug describes document type.

Examples:
- `2024-01-15-bos-minutes` — Board of Supervisors meeting minutes from Jan 15, 2024
- `2014-06-01-girdwood-area-plan` — Girdwood Area Plan adopted June 2014

### File Structure
Each source lives in its own directory under `sources/`:
```
sources/{id}/
  original.pdf      # PDF download (if available)
  original.html     # Raw HTML (if HTML-only source)
  original.md       # Markdown conversion of HTML or PDF text
```

### index.json
All sources are registered in `index.json` at the repo root. Each entry has:
- `id` — unique source ID (matches directory name)
- `title` — human-readable title
- `category` — one of: `board-minutes`, `planning`, `housing`, `economic`, `government`, `transportation`
- `date_added` — ISO date when added to archive
- `original_publication_date` — ISO date of original publication (null if unknown)
- `url` — canonical source URL
- `files` — array of `{ path, filetype, sha256 }` for each saved file
- `notes` — free text context

---

## Known Sources to Monitor

When running `/update-archive`, check the following pages for new or updated documents:

### Board of Supervisors
- **Girdwood Board of Supervisors (GBOS)**
  - URL: https://www.muni.org/Departments/operations/streets/Service/pages/girdwoodboardofsupervisors.aspx
  - What to archive: Meeting minutes (PDFs linked from this page)
  - Category: `board-minutes`

### Housing & Economic
- **Girdwood Housing and Economic Committee (GHEC)**
  - URL: https://www.muni.org/Departments/operations/streets/Service/Pages/gbos-ghec.aspx
  - What to archive: Meeting packets and minutes (PDFs linked from this page)
  - Category: `housing`

### Planning
- **Girdwood Area Plan (publication page)**
  - URL: https://www.muni.org/Departments/OCPD/Planning/Publications/pages/girdwoodareaplan.aspx
  - What to archive: Full plan PDF and chapter PDFs
  - Category: `planning`

- **Girdwood Area Plan Update Project**
  - URL: https://www.muni.org/Departments/OCPD/Planning/Projects/Pages/GAPUpdate.aspx
  - What to archive: Any new planning documents or amendments published
  - Category: `planning`

### Transportation
- **Safer Seward Highway Project (Potter Marsh to Bird Flats)**
  - URL: https://safersewardhighway.com/
  - What to archive: Environmental assessments, public comment summaries, project updates
  - Category: `transportation`

- **Seward & Alyeska Highway Intersection Improvement**
  - URL: https://sewardalyeskahwyintersection.com/
  - What to archive: Design documents, public notices, project updates
  - Category: `transportation`

- **Seward Highway MP 25.5–36 Rehabilitation**
  - URL: https://dot.alaska.gov/creg/sewardhwy25-36/
  - What to archive: Project reports, public notices
  - Category: `transportation`

### State Legislature
- **Alaska Legislature Bill Search**
  - URL: https://www.akleg.gov/basis/Home.asp
  - What to archive: Bills and resolutions mentioning "Girdwood" — search each session
  - Category: `government`

---

## Categories Reference

| Category | Description |
|----------|-------------|
| `board-minutes` | Girdwood Board of Supervisors meeting minutes and agendas |
| `planning` | Land use plans, zoning, area plans |
| `housing` | Housing studies, GHEC documents |
| `economic` | Economic analyses and development reports |
| `government` | MOA Assembly resolutions, state legislation |
| `transportation` | ADOT projects, road/transit plans |
