import sharp from 'sharp';
import fs from 'fs/promises';
import NodeCache from 'node-cache';
import path from 'path';

const cache = new NodeCache({ stdTTL: 60 });

export async function compressAndSave(file: Express.Multer.File) {
  const filename = `${Date.now()}-${file.originalname}`;
  const outPath = path.join('uploads', filename);

  // compressão
  const buffer = await sharp(file.buffer)
    .resize(800)       // exemplo de redimensionamento
    .toBuffer();

  // coloca no cache antes de salvar
  cache.set(filename, buffer);

  // salva em disco
  await fs.mkdir('uploads', { recursive: true });
  await fs.writeFile(outPath, buffer);

  return filename;
}

export function getImageBuffer(filename: string) {
  const cached = cache.get<Buffer>(filename);
  if (cached) return cached;
  const disk = fs.readFile(path.join('uploads', filename));
  cache.set(filename, disk);
  return disk;
}
