import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database/db';

describe('User routes', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  describe('GET /users', () => {
    it('returns all users', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toStrictEqual({
        id: 1,
        username: 'mateogordo',
        email: 'gordo@email.com',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  describe('GET /users/:id', () => {
    it('returns a single user by id', async () => {
      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toStrictEqual({
        id: 1,
        username: 'mateogordo',
        email: 'gordo@email.com',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });
});
