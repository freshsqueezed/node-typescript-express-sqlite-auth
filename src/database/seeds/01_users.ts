import { Knex } from 'knex';
import { genSalt, hash } from 'bcryptjs';
import { User } from '../../types';

export async function seed(knex: Knex): Promise<void> {
  const salt = await genSalt();
  const hashed = await hash('password123', salt);

  // Deletes ALL existing entries
  await knex('users').del();

  // Inserts seed entries
  await knex<User>('users').insert([
    {
      id: 1,
      username: 'mateogordo',
      email: 'gordo@email.com',
      password: hashed,
    },
  ]);

  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))`);
}
