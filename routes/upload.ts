import { IncomingMessage, ServerResponse } from 'http';
import multer from 'multer';
import { compressAndSave } from '../services/imageService';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    const allowed = ['image/png','image/jpeg','image/webp'];
    cb(null, allowed.includes(file.mimetype));
  }
}).single('image');

export function router(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') return res.writeHead(405).end();
  upload(req as any, res as any, async err => {
    if (err) {
      if ((err as any).code === 'LIMIT_FILE_SIZE') return res.writeHead(413).end();
      if ((err as any).message === 'Unexpected field') return res.writeHead(400).end();
      return res.writeHead(500).end();
    }
    const file = (req as any).file;
    await compressAndSave(file);
    res.writeHead(204).end();
  });
}