# Girdwood Research Archive

A self-maintaining archive of primary sources for research on political, economic, and housing issues in Girdwood, Alaska.

## Purpose

- Preserve documents that may disappear from the web (board minutes, planning docs, etc.)
- Provide a single compendium of sources for downstream research
- Auto-update weekly via GitHub Actions

## Structure

```
sources/{YYYY-MM-DD-slug}/   # One directory per source, named by ID
  original.pdf               # PDF (if available)
  original.html              # Raw HTML (if HTML-only source)
  original.md                # Markdown conversion
index.json                   # Master registry of all sources
CLAUDE.md                    # Source URLs to monitor + conventions
```

## index.json

Every archived source has an entry in `index.json` with:

| Field | Description |
|-------|-------------|
| `id` | Unique ID (`YYYY-MM-DD-slug`) |
| `title` | Human-readable title |
| `category` | Topic area (board-minutes, planning, housing, economic, government, transportation) |
| `date_added` | When added to this archive |
| `original_publication_date` | Original publication date |
| `url` | Source URL |
| `files` | Array of saved files with path, filetype, sha256 |
| `notes` | Context or notes |

## Sources Monitored

See [CLAUDE.md](CLAUDE.md) for the full list of source URLs. Current coverage:

- **Girdwood Board of Supervisors** — meeting minutes (MOA)
- **Girdwood Housing & Economic Committee** — meeting packets and minutes
- **Girdwood Area Plan** — land use planning documents (MOA)
- **Transportation** — ADOT Seward Highway and Alyeska intersection projects
- **State Legislature** — Alaska bills and resolutions mentioning Girdwood

## Updating the Archive

**Manually (interactive):**
```
/update-archive
```

**Via GitHub Actions:** The workflow runs automatically every Monday. Trigger manually via the Actions tab → "Weekly Archive Update" → "Run workflow".

## Adding New Sources

Edit [CLAUDE.md](CLAUDE.md) and add a new entry under "Known Sources to Monitor" with the URL, what to archive, and the category. The next `/update-archive` run will pick it up.
