import 'dotenv/config';

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  HOST = 'localhost',
  TOKEN_SECRET = 'changeme',
  TOKEN_NAME = 'node_auth_access_token',
} = process.env;

export const isProd = NODE_ENV === 'production';
