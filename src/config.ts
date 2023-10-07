import 'dotenv/config';

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  HOST = 'localhost',
  TOKEN_SECRET = 'changeme',
  TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTY5NjcxNjEwOCwiZXhwIjoxNjk2NzE5NzA4fQ.TdTW4GA4vyxzHJkGx9wlPRDkAgkGPSEZxubxa5GYU78',
} = process.env;

export const isProd = NODE_ENV === 'production';
