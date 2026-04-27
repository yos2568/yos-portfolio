#!/usr/bin/env node
// Repack tofu/_src/ back into tofu/index.html (rebuilding the bundler manifest)
import { readFileSync, writeFileSync } from 'node:fs';
import { gzipSync } from 'node:zlib';
import { join } from 'node:path';

const HTML = 'tofu/index.html';
const SRC  = 'tofu/_src';

const html = readFileSync(HTML, 'utf8');
const pathmap = JSON.parse(readFileSync(join(SRC, '_pathmap.json'), 'utf8'));

const manifest = {};
for (const [uuid, info] of Object.entries(pathmap)) {
  const filepath = join(SRC, info.filename);
  const raw = readFileSync(filepath);
  let dataB64;
  let compressed = !!info.compressed;
  if (compressed) {
    dataB64 = gzipSync(raw, { level: 9 }).toString('base64');
  } else {
    dataB64 = raw.toString('base64');
  }
  manifest[uuid] = {
    mime: info.mime,
    compressed,
    data: dataB64
  };
}

const newManifestJson = JSON.stringify(manifest);

// Replace the manifest <script> contents (keep template + ext_resources unchanged)
const re = /(<script type="__bundler\/manifest">)([\s\S]*?)(<\/script>)/;
const m = html.match(re);
if (!m) {
  console.error('Could not find manifest script tag');
  process.exit(1);
}

const out = html.replace(re, `$1${newManifestJson}$3`);
writeFileSync(HTML, out);

const beforeSize = readFileSync(HTML).length;
console.log(`Repacked ${Object.keys(manifest).length} entries`);
console.log(`tofu/index.html size: ${beforeSize.toLocaleString()} bytes`);
