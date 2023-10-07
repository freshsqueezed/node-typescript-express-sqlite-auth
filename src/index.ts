import { createServer } from 'node:http';
import app from './app';
import { HOST, PORT, isProd } from './config';

const server = createServer(app);

server.listen(
  {
    host: HOST,
    port: PORT,
  },
  () => {
    console.log(`Listening on http${isProd ? 's' : ''}://${HOST}:${PORT}...`);
  },
);
