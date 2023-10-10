import { NextFunction, Request, Response } from 'express';
import { validatePassword } from '../utils/password';
import { createTokenFromUser } from '../utils/tokens';
import { createUser, getUserByEmail } from '../database/queries/user';
import { TOKEN_NAME } from '../config';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error('Please provide valid credentials.');
    }

    const user = await getUserByEmail(email);
    if (!user?.password) {
      throw new Error('Invalid user.');
    }

    const isValid = await validatePassword(password, user.password);
    if (!user || !isValid) {
      throw new Error('Invalid credentials.');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = await createTokenFromUser(user, '1hr');

    res.cookie(TOKEN_NAME, token);
    res.status(200).json({
      status: 'success',
      user: userWithoutPassword,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !username || !password) {
      throw new Error('Please provide valid email, username, and password.');
    }

    const emailCheck = await getUserByEmail(email);
    if (emailCheck) {
      throw new Error('User already exists.');
    }

    const user = await createUser({ email, username, password });
    if (!user) {
      throw new Error('Error creating user.');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = await createTokenFromUser(user, '1hr');

    res.cookie(TOKEN_NAME, token);
    res.status(200).json({
      status: 'success',
      user: userWithoutPassword,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};

export const logoutController = (req: Request, res: Response) => {
  res.cookie(TOKEN_NAME, '', {
    maxAge: -1,
    path: '/',
  });

  req.user = null;

  return {
    status: 'success',
    redirect: '/logout',
  };
};

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).json({
      status: 'success',
      user: req.user ?? null,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};
