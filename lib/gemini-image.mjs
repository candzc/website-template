import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_MODEL = 'gemini-2.5-flash-image';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

function slugify(text) {
  return (
    text
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .slice(0, 60) || 'image'
  );
}

/**
 * Generates an image via the Google Gemini image API and saves it to disk.
 * @param {object} options
 * @param {string} options.prompt - Text prompt describing the image.
 * @param {string} [options.outputDir] - Directory to save into, relative to cwd.
 * @param {string} [options.fileName] - Optional file name (extension is inferred from the response mime type).
 * @param {string} [options.model] - Gemini model id.
 * @param {string} [options.apiKey] - Overrides the env-derived API key.
 */
export async function generateImage({
  prompt,
  outputDir = 'public/images/generated',
  fileName,
  model = DEFAULT_MODEL,
  apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_AI_API_KEY,
} = {}) {
  if (!prompt) throw new Error('generateImage: "prompt" is required.');
  if (!apiKey) {
    throw new Error(
      'Kein API-Key gefunden. Setze GEMINI_API_KEY (oder GOOGLE_AI_API_KEY) in den Umgebungsvariablen.'
    );
  }

  const url = `${API_BASE}/${model}:generateContent?key=${apiKey}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Gemini API Fehler ${res.status}: ${errText}`);
  }

  const data = await res.json();
  const parts = data?.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inlineData?.data);

  if (!imagePart) {
    const textPart = parts.find((p) => p.text)?.text;
    throw new Error(
      `Kein Bild in der Antwort gefunden.${textPart ? ` Modell-Antwort: ${textPart}` : ''}`
    );
  }

  const { mimeType, data: base64 } = imagePart.inlineData;
  const ext = mimeType?.split('/')[1]?.replace('jpeg', 'jpg') || 'png';
  const baseName = fileName ? fileName.replace(/\.[a-z0-9]+$/i, '') : slugify(prompt);
  const finalName = `${baseName}.${ext}`;

  const absoluteDir = path.resolve(process.cwd(), outputDir);
  await mkdir(absoluteDir, { recursive: true });
  const absolutePath = path.join(absoluteDir, finalName);
  await writeFile(absolutePath, Buffer.from(base64, 'base64'));

  const relativePath = path.relative(process.cwd(), absolutePath);
  const publicPath = outputDir.startsWith('public/')
    ? '/' + path.relative('public', absolutePath).split(path.sep).join('/')
    : null;

  return { path: absolutePath, relativePath, publicPath, mimeType, model };
}
