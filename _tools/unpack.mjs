#!/usr/bin/env node
// Unpack the Claude artifact bundle from tofu/index.html into _src/
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { dirname, join } from 'node:path';

const HTML = 'tofu/index.html';
const OUT = 'tofu/_src';

const html = readFileSync(HTML, 'utf8');

function extractScript(type) {
  const re = new RegExp(`<script type="${type}">([\\s\\S]*?)<\\/script>`);
  const m = html.match(re);
  if (!m) throw new Error(`Missing script type=${type}`);
  return m[1];
}

const manifestRaw = extractScript('__bundler/manifest');
const templateRaw = extractScript('__bundler/template');
const extRaw      = extractScript('__bundler/ext_resources');

const manifest = JSON.parse(manifestRaw);
const template = JSON.parse(templateRaw);

mkdirSync(OUT, { recursive: true });

// Save raw artifacts for re-pack reference
writeFileSync(join(OUT, '_template.json'), JSON.stringify(template, null, 2));
writeFileSync(join(OUT, '_ext_resources.json'), extRaw.trim() || '{}');

// Build path map: try to derive sensible filenames from the template
// Template often references uuids like {"ef1b...": "src/App.tsx"} or by path
function findPathForUuid(uuid) {
  // Search the template for any string mentioning this uuid
  const stack = [template];
  while (stack.length) {
    const node = stack.pop();
    if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) {
        if (typeof v === 'string' && v.includes(uuid)) return { key: k, path: null };
        if (typeof v === 'object') stack.push(v);
      }
    }
  }
  return null;
}

const pathMap = {};
const uuids = Object.keys(manifest);
console.log(`Manifest has ${uuids.length} entries`);

for (const [uuid, entry] of Object.entries(manifest)) {
  const bytes = Buffer.from(entry.data, 'base64');
  const finalBytes = entry.compressed ? gunzipSync(bytes) : bytes;
  const mime = entry.mime || 'application/octet-stream';
  let ext = 'bin';
  if (mime.includes('javascript')) ext = 'js';
  else if (mime.includes('typescript')) ext = 'ts';
  else if (mime.includes('json')) ext = 'json';
  else if (mime.includes('css')) ext = 'css';
  else if (mime.includes('html')) ext = 'html';
  else if (mime.includes('png')) ext = 'png';
  else if (mime.includes('jpeg')) ext = 'jpg';
  else if (mime.includes('svg')) ext = 'svg';
  else if (mime.includes('mpeg') || mime.includes('mp3')) ext = 'mp3';
  else if (mime.includes('text/plain')) ext = 'txt';

  const filename = `${uuid}.${ext}`;
  const fpath = join(OUT, filename);
  writeFileSync(fpath, finalBytes);
  pathMap[uuid] = { filename, mime, compressed: !!entry.compressed, size: finalBytes.length };
}

writeFileSync(join(OUT, '_pathmap.json'), JSON.stringify(pathMap, null, 2));
console.log(`Unpacked ${uuids.length} files to ${OUT}/`);
console.log('Summary:');
const byExt = {};
for (const v of Object.values(pathMap)) {
  const e = v.filename.split('.').pop();
  byExt[e] = (byExt[e] || 0) + 1;
}
console.log(byExt);
