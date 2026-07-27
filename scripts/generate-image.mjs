#!/usr/bin/env node
import { generateImage } from '../lib/gemini-image.mjs';

const [, , prompt, fileName] = process.argv;

if (!prompt) {
  console.error('Nutzung: node scripts/generate-image.mjs "<prompt>" [dateiname]');
  process.exit(1);
}

try {
  const result = await generateImage({ prompt, fileName });
  console.log('Bild gespeichert:', result.relativePath);
  if (result.publicPath) console.log('Public-Pfad (z. B. <img src="...">):', result.publicPath);
} catch (err) {
  console.error('Fehler:', err.message);
  process.exit(1);
}
