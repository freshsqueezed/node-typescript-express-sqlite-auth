import 'dotenv/config';

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  HOST = 'localhost',
} = process.env;
