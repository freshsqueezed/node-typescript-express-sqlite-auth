import { compare, genSalt, hash } from 'bcryptjs';

export const validatePassword = async (
  userPassword: string,
  dbPassword: string,
): Promise<boolean> => {
  return await compare(userPassword, dbPassword);
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};
