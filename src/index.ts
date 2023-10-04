import { createServer } from 'node:http';
import app from './app';
import { HOST, NODE_ENV, PORT } from './config';

const server = createServer(app);

server.listen(
  {
    host: HOST,
    port: PORT,
  },
  () => {
    console.log(
      `Listening on http${
        NODE_ENV === 'production' ? 's' : ''
      }://${HOST}:${PORT}...`,
    );
  },
);
