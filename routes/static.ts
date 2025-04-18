import { IncomingMessage, ServerResponse } from 'http';
import { getImageBuffer } from '../services/imageService';

export async function staticRouter(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET') return res.writeHead(405).end();
  const [, , filename] = req.url!.split('/');
  try {
    const buf = await getImageBuffer(filename);
    res.writeHead(200, { 'Content-Type': 'image/*' }).end(buf);
  } catch {
    res.writeHead(404).end();
  }
}
