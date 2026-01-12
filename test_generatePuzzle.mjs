import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('.');
const genPath = path.join(projectRoot, 'wf-connect', 'src', 'app', 'helpers', 'generatePuzzle.js');
const jsonPath = path.join(projectRoot, 'wf-connect', 'src', 'app', 'items_with_groups.json');

const genSrc = fs.readFileSync(genPath, 'utf8');
const items = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// remove lodash import if present
let modified = genSrc.replace(/import\s+\{[^}]*\}\s+from\s+['"]lodash['"];?\s*/m, '');
// replace json import with inline data
modified = modified.replace(/import\s+itemsData\s+from\s+['"][^'\"]*items_with_groups\.json['"];?\s*/m,
  `const itemsData = ${JSON.stringify(items)};\n`);

const dataUrl = 'data:text/javascript;charset=utf-8,' + encodeURIComponent(modified);

try {
  const mod = await import(dataUrl);
  if (!mod || !mod.default) {
    console.error('generatePuzzle default export not found');
    process.exit(2);
  }
  const puzzle = await mod.default({ seed: 12 });
  console.log(JSON.stringify(puzzle, null, 2));
} catch (err) {
  console.error('Error running generator:', err);
  process.exit(1);
}
