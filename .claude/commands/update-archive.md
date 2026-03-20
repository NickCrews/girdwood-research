You are maintaining the Girdwood Research Archive — a primary source archive for political, economic, and housing research on Girdwood, Alaska.

## Overview

This command runs in three phases. index.json acts as a shared TODO list: new entries are registered first (without file info), then subagents download and finalize them in parallel.

---

## Phase 1: Discovery

For each source URL listed in `CLAUDE.md`:

1. **Read `index.json`** to get the list of already-archived URLs.

2. **Fetch the source page** using WebFetch.

3. **Identify linked documents** (PDFs, substantive HTML pages) that are not yet in `index.json`.
   - A document is already archived if its URL appears in any existing entry's `url` field.

4. **For each new document found**, immediately add a skeleton entry to `index.json`:

   ```json
   {
     "id": "2024-01-15-bos-minutes",
     "title": "Girdwood Board of Supervisors Minutes – January 15, 2024",
     "category": "board-minutes",
     "date_added": "2026-03-19",
     "original_publication_date": "2024-01-15",
     "url": "https://...",
     "files": [],
     "status": "pending",
     "notes": ""
   }
   ```

   - **ID format**: `{YYYY-MM-DD}-{short-slug}` — use the document's original publication date, not today's
   - If the date is uncertain, use your best estimate and note it in `notes`
   - Keep entries sorted by `id` (chronological)
   - Set `status: "pending"` — this signals that files haven't been downloaded yet

5. **Set `last_updated`** to today's date after all discovery is done.

Do not download any files during Phase 1. Just register the new entries and move on.

---

## Phase 2: Download (delegate to subagents)

For each entry with `"status": "pending"` in `index.json`, **launch a subagent** to handle that entry. Subagents can run in parallel.

Each subagent receives the source `id` and `url` and does the following:

1. **Create the source directory**: `sources/{id}/`

2. **Download the files**:
   - For PDFs: `curl -L -o sources/{id}/original.pdf "{url}"`
   - For HTML pages: Use WebFetch, save raw HTML as `sources/{id}/original.html`, then convert to clean markdown and save as `sources/{id}/original.md`
   - For listing pages that link to PDFs: Download the PDF; also save the listing page as `original.html` + `original.md` if it contains substantive content

3. **Run the finalize script** to compute SHA256 hashes and update `index.json`:

   ```bash
   node scripts/finalize-source.js {id}
   ```

   This script reads the downloaded files under `sources/{id}/`, computes their SHA256 hashes, and writes the `files` array into the entry in `index.json`. It also sets `"status": "done"`.

4. **Update `notes`** in the entry if there is anything worth recording (e.g., date was estimated, page required login, file was redirected).

---

## Phase 3: Wrap-up

After all subagents complete:

1. Verify all entries that were `"pending"` at the start of this run are now `"done"`.
2. Report a summary:
   - How many new sources were added
   - List each new source ID and title
   - Note any sources checked but found nothing new
   - Note any errors or entries still in `"pending"` state

---

## index.json Entry Format (final)

```json
{
  "id": "2024-01-15-bos-minutes",
  "title": "Girdwood Board of Supervisors Minutes – January 15, 2024",
  "category": "board-minutes",
  "date_added": "2026-03-19",
  "original_publication_date": "2024-01-15",
  "url": "https://...",
  "files": [
    {"path": "sources/2024-01-15-bos-minutes/original.pdf", "filetype": "pdf", "sha256": "abc123..."},
    {"path": "sources/2024-01-15-bos-minutes/original.md", "filetype": "md", "sha256": "def456..."}
  ],
  "status": "done",
  "notes": "Regular monthly meeting"
}
```

---

## Rules

- **Never re-download** a file whose entry already has `status: "done"` in `index.json`
- **Preserve existing entries** — only append new ones; never modify entries with `status: "done"` unless correcting an obvious error
- **Use the document's date** for the ID prefix, not today's date (unless the document has no date)
- **Keep index.json valid JSON** — format with 2-space indentation
- **Do not commit** — just update files; the CI workflow handles committing
