import request from 'supertest';
import app from '../../src/app';
import db from '../../src/database/db';
import { createTokenFromUser } from '../../src/utils/tokens';
import { Role } from '../../src/types';

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
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: Role.ADMIN,
        },
        '1hr',
      );

      const response = await request(app)
        .get('/users')
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data.length).toBeGreaterThan(0);
      expect(response.body.data[0]).toStrictEqual({
        id: 1,
        username: 'mateogordo',
        email: 'gordo@email.com',
        role: 'USER',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  describe('GET /users/:id', () => {
    it('returns a single user by id', async () => {
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: Role.ADMIN,
        },
        '1hr',
      );

      const response = await request(app)
        .get('/users/1')
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toStrictEqual({
        id: 1,
        username: 'mateogordo',
        email: 'gordo@email.com',
        role: 'USER',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  describe('POST /users', () => {
    it('creates a new user', async () => {
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: Role.ADMIN,
        },
        '1hr',
      );

      const response = await request(app)
        .post('/users')
        .send({
          username: 'newUser',
          email: 'new@email.com',
          password: 'password123',
        })
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toStrictEqual({
        id: 2,
        username: 'newUser',
        email: 'new@email.com',
        role: 'USER',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  describe('PUT /users/:id', () => {
    it('updates a user by id', async () => {
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: Role.ADMIN,
        },
        '1hr',
      );

      const response = await request(app)
        .put('/users/1')
        .send({
          username: 'updatedUser',
        })
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toStrictEqual({
        id: 1,
        username: 'updatedUser',
        email: 'gordo@email.com',
        role: 'USER',
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });
  });

  describe('DELETE /users/:id', () => {
    it('deletes a user by id', async () => {
      const token = await createTokenFromUser(
        {
          id: 1,
          username: 'mateogordo',
          email: 'gordo@email.com',
          role: Role.ADMIN,
        },
        '1hr',
      );

      const response = await request(app)
        .del('/users/1')
        .set({
          'x-access-token': `Bearer ${token}`,
        });

      expect(response.status).toBe(200);
      expect(response.type).toBe('application/json');
      expect(response.body).toHaveProperty('status');
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toStrictEqual(
        'User with id 1 successfully deleted.',
      );
    });
  });
});
