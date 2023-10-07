import 'dotenv/config';

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  HOST = 'localhost',
  TOKEN_SECRET = 'changeme',
} = process.env;

export const isProd = NODE_ENV === 'production';
