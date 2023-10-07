import request from 'supertest';
import app from '../../src/app';

describe('Main Routes', () => {
  describe('GET /', () => {
    it('returns a hello world response', async () => {
      const res = await request(app).get('/');

      expect(res.status).toBe(200);
      expect(res.type).toBe('application/json');
      expect(res.body).toHaveProperty('message');
      expect(res.body.message).toBe('hello world!');
    });
  });
});
