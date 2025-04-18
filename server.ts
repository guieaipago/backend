import http from 'http';
import { router } from './routes/upload';
import { staticRouter } from './routes/static';

const server = http.createServer((req, res) => {
  if (req.url?.startsWith('/upload')) return router(req, res);
  if (req.url?.startsWith('/static')) return staticRouter(req, res);
  res.writeHead(404).end();
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Listening on ${PORT}`));