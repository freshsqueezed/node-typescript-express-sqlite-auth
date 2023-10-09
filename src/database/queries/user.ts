import db from '../db';
import { User } from '../../types';
import { hashPassword } from '../../utils/password';

export const getAllUsers = async (): Promise<User[]> => {
  return await db<User>('users').select(
    'id',
    'username',
    'email',
    'created_at',
    'updated_at',
  );
};

export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  return await db<User>('users').first().where({ email });
};

export const getUserById = async (id: string): Promise<User | undefined> => {
  return await db<User>('users')
    .first()
    .where({ id: parseInt(id) });
};

export async function createUser(
  email: string,
  username: string,
  password: string,
): Promise<User | undefined> {
  const [user] = await db<User>('users')
    .insert({
      email,
      username,
      password: await hashPassword(password),
    })
    .returning('*');

  return user;
}
