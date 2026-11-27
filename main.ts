import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The motto is a two-beat joke: grand credentials, then a humble job.
const SETUP = "Trained on all of human knowledge;"; // the build-up
const KICKER = "employed to fix your typos."; // the punchline
const ENTRY = `${SETUP} ${KICKER}`;

// Enforce the program/v1 text rules before touching the filesystem.
function validate(text: string): void {
  // Length is measured in code points, not UTF-16 units.
  const length = [...text].length;
  if (length < 1 || length > 200) {
    throw new Error(`entry must be 1-200 code points, got ${length}`);
  }
  // Single line: reject CR, LF and the Unicode line/paragraph separators.
  if (/[\r\n\u2028\u2029]/.test(text)) {
    throw new Error("entry must be a single line");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be empty or whitespace-only");
  }
}

validate(ENTRY);

// Write the entry plus exactly one trailing newline.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
