/**
 * Minimal BibTeX/biblatex parser for the Zotero export.
 * Handles the subset Zotero produces: @type{key, field = {value}, ...}
 * with nested braces, `date`/`year`, `journaltitle`/`journal`.
 */

export interface BibEntry {
  type: string;
  key: string;
  title: string;
  authors: string[];
  year: string;
  venue: string;
  doi?: string;
  url?: string;
}

/** Strip biblatex brace-protection ({{ScienceDirect}} -> ScienceDirect). */
function cleanValue(raw: string): string {
  return raw
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .replace(/\\&/g, "&")
    .trim();
}

/** "Last, First and Last, First" -> ["First Last", ...] */
function parseAuthors(raw: string): string[] {
  if (!raw) return [];
  return cleanValue(raw)
    .split(/\s+and\s+/)
    .map((a) => {
      const [last, first] = a.split(",").map((s) => s.trim());
      return first ? `${first} ${last}` : (last ?? a.trim());
    });
}

/** Extract balanced-brace or quoted field values from an entry body. */
function parseFields(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const re = /(\w+)\s*=\s*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    const name = m[1]!.toLowerCase();
    let i = re.lastIndex;
    const open = body[i];
    let value = "";
    if (open === "{") {
      let depth = 0;
      const start = ++i;
      for (; i < body.length; i++) {
        if (body[i] === "{") depth++;
        else if (body[i] === "}") {
          if (depth === 0) break;
          depth--;
        }
      }
      value = body.slice(start, i);
    } else if (open === '"') {
      const start = ++i;
      while (i < body.length && body[i] !== '"') i++;
      value = body.slice(start, i);
    } else {
      // bare value (numbers)
      const start = i;
      while (i < body.length && body[i] !== "," && body[i] !== "\n") i++;
      value = body.slice(start, i);
    }
    fields[name] = value.trim();
    re.lastIndex = i + 1;
  }
  return fields;
}

export function parseBibtex(source: string): BibEntry[] {
  const entries: BibEntry[] = [];
  const entryRe = /@(\w+)\s*\{\s*([^,\s]+)\s*,/g;
  let m: RegExpExecArray | null;
  while ((m = entryRe.exec(source)) !== null) {
    const type = m[1]!.toLowerCase();
    if (type === "comment" || type === "preamble" || type === "string") continue;
    // find the balanced closing brace of this entry
    let depth = 1;
    let i = entryRe.lastIndex;
    for (; i < source.length && depth > 0; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") depth--;
    }
    const body = source.slice(entryRe.lastIndex, i - 1);
    entryRe.lastIndex = i;

    const f = parseFields(body);
    const year =
      f.year ?? (f.date ? (f.date.match(/\d{4}/)?.[0] ?? "") : "");
    entries.push({
      type,
      key: m[2]!,
      title: cleanValue(f.title ?? "Sans titre"),
      authors: parseAuthors(f.author ?? ""),
      year,
      venue: cleanValue(
        f.journaltitle ?? f.journal ?? f.booktitle ?? f.publisher ?? "",
      ),
      doi: f.doi ? cleanValue(f.doi) : undefined,
      url: f.url ? f.url.trim() : undefined,
    });
  }
  return entries;
}
