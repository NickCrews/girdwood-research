You are maintaining the Girdwood Research Archive — a primary source archive for political, economic, and housing research on Girdwood, Alaska.

## Your Task

Check all known source URLs listed in `CLAUDE.md` for new or updated documents. Download any documents not yet in `index.json` and add them to the archive.

## Step-by-Step Instructions

1. **Read the current archive state**
   - Read `index.json` to see what's already archived (IDs, URLs, file hashes)
   - Read `CLAUDE.md` to get the list of source URLs and their categories

2. **For each source URL in CLAUDE.md**:
   - Fetch the page using WebFetch
   - Identify linked documents (PDFs, etc.) that are not yet in `index.json`
   - A document is "already archived" if its URL appears in an existing `index.json` entry

3. **For each new document found**:

   a. **Determine the ID**: Use format `{YYYY-MM-DD}-{short-slug}` where the date is the original publication date (from the document or its filename/metadata). If the date is uncertain, use the best estimate and note it. Slugs should be lowercase, hyphenated, descriptive (e.g., `bos-minutes`, `ghec-packet`, `gap-chapter-1`).

   b. **Create the source directory**: `sources/{id}/`

   c. **Download the files**:
      - For PDFs: Use `curl -L -o sources/{id}/original.pdf "{url}"` via Bash
      - For HTML pages: Use WebFetch to get the content, save as `sources/{id}/original.html`, then convert to clean markdown and save as `sources/{id}/original.md`
      - For pages that link to PDFs: Download the PDF; also save the index/listing page as `original.html` + `original.md` if it's substantive

   d. **Compute SHA256 hashes** for each downloaded file:
      ```
      shasum -a 256 sources/{id}/original.pdf
      ```

   e. **Add entry to index.json**: Insert a new entry into the `sources` array with all required fields. Keep the array sorted by `id` (which sorts chronologically by date prefix).

4. **Update `index.json`**:
   - Set `last_updated` to today's date (ISO format)
   - Write the updated JSON back to `index.json`

5. **Report what you did**: Summarize:
   - How many new sources were added
   - List each new source ID and title
   - Note any sources you checked but found nothing new
   - Note any errors or access issues

## index.json Entry Format

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
  "notes": "Regular monthly meeting"
}
```

## Important Rules

- **Never re-download** a file that already has an entry in `index.json` with a matching URL
- **Preserve existing entries** — only append new ones, never modify existing entries unless correcting an obvious error
- **Use the date from the document** for the ID prefix, not today's date (unless the document has no date)
- **Keep index.json valid JSON** — format it with 2-space indentation
- **Do not commit** — just update files; the CI workflow handles committing
