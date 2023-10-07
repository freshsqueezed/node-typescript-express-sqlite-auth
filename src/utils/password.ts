import { compare, genSalt, hash } from 'bcryptjs';

export const validatePassword = async (
  userPassword: string,
  dbPassword: string,
): Promise<boolean> => {
  try {
    return await compare(userPassword, dbPassword);
  } catch (err) {
    throw new Error('Password validation failed.');
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await genSalt(10);
    const hashed = await hash(password, salt);
    return hashed;
  } catch (err) {
    throw new Error('Password hashing failed.');
  }
};
