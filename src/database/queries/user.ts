import db from '../db';
import { User } from '../../types';
import { hashPassword } from '../../utils/password';

export const getAllUsers = async (): Promise<User[]> => {
  const users = await db<User>('users').select(
    'id',
    'username',
    'email',
    'role',
    'created_at',
    'updated_at',
  );

  if (!users.length) {
    throw new Error('No users exist.');
  }

  return users;
};

export const getUserByEmail = async (
  email: string,
): Promise<User | undefined> => {
  const user = await db<User>('users').first().where({ email });

  return user;
};

export const getUserById = async (id: string): Promise<User> => {
  const user = await db<User>('users')
    .first()
    .where({ id: parseInt(id) });

  if (!user) {
    throw new Error('User does not exist.');
  }

  return user;
};

export async function createUser(
  email: string,
  username: string,
  password: string,
): Promise<User> {
  const [user] = await db<User>('users')
    .insert({
      email,
      username,
      password: await hashPassword(password),
    })
    .returning(['id', 'username', 'email', 'role', 'created_at', 'updated_at']);

  if (!user) {
    throw new Error('Error creating user.');
  }

  return user;
}

export async function updateUser(
  id: string,
  user: Partial<User>,
): Promise<User> {
  const [updatedUser] = await db<User>('users')
    .where({ id: parseInt(id) })
    .update({
      ...user,
    })
    .returning(['id', 'username', 'email', 'role', 'created_at', 'updated_at']);

  if (!updateUser) {
    throw new Error('Error creating user.');
  }

  return updatedUser;
}

export async function deleteUser(id: string): Promise<User[]> {
  const user = await db<User>('users')
    .del()
    .where({
      id: parseInt(id),
    })
    .returning('*');

  return user;
}
