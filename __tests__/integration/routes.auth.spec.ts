import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database/db';
import { createTokenFromUser } from '../../src/utils/tokens';

describe('Auth Routes', () => {
  beforeEach(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
  });

  afterAll(async () => {
    await db.migrate.rollback();
    await db.destroy();
  });

  describe('POST /auth/login', () => {
    it('should throw an error if credentials invalid', async () => {
      try {
        await request(app).post('/auth/login').send({
          email: 'gordo@email.com',
          password: 'invalid',
        });
      } catch (err) {
        if (err instanceof Error) {
          expect(err).toBeTruthy();
          expect(err.message).toBe('Invalid credentials.');
        }
      }
    });

    it('should return a user with a token', async () => {
      const response = await request(app).post('/auth/login').send({
        email: 'gordo@email.com',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toEqual({
        status: 'success',
        token: expect.any(String),
        user: {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: 'USER',
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });
  });

  describe.only('POST /auth/register', () => {
    it('should throw an error if missing properties', async () => {
      try {
        await request(app).post('/auth/register').send({
          email: 'gordo@email.com',
        });
      } catch (err) {
        if (err instanceof Error) {
          expect(err).toBeTruthy();
          expect(err.message).toBe('Invalid credentials.');
        }
      }
    });

    it('should return a user with a token', async () => {
      const response = await request(app).post('/auth/register').send({
        email: 'new@email.com',
        username: 'newUser',
        password: 'password123',
      });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body).toEqual({
        status: 'success',
        token: expect.any(String),
        user: {
          id: 2,
          username: 'newUser',
          email: 'new@email.com',
          role: 'USER',
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });
  });

  describe('GET /auth/me', () => {
    it('should return a user with valid token', async () => {
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
        },
        '1hr',
      );

      const response = await request(app)
        .get('/auth/me')
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('user');
      expect(response.body).toEqual({
        status: 'success',
        user: {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: 'USER',
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      });
    });
  });
});
