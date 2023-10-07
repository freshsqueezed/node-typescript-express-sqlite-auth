import { NextFunction, Request, Response } from 'express';
import { validatePassword } from '../utils/password';
import { createTokenFromUser } from '../utils/tokens';
import { AuthenticationError, LoginError, RegistrationError } from '../errors';
import { createUser, getUserByEmail } from '../database/queries/user';

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new LoginError('Please provide valid credentials.');
    }

    const user = await getUserByEmail(email);

    if (!user || !(await validatePassword(password, user?.password!))) {
      throw new AuthenticationError('Invalid credentials.');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = await createTokenFromUser(user, '1hr');

    res.status(200).json({
      status: 'success',
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    if (err instanceof AuthenticationError) {
      res.status(401).json({
        error: 'Unauthorized',
        message: err.message,
      });
    } else if (err instanceof LoginError) {
      res.status(400).json({
        status: 'error',
        message: err.message,
      });
    } else {
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
      throw new RegistrationError(
        'Please provide valid email, username, and password.',
      );
    }

    const emailCheck = await getUserByEmail(email);
    if (emailCheck) {
      throw new RegistrationError('User already exists.');
    }

    const user = await createUser(email, username, password);

    if (!user) {
      throw new RegistrationError('Error creating user.');
    }

    const { password: _, ...userWithoutPassword } = user;

    const token = await createTokenFromUser(user, '1hr');

    res.status(200).json({
      status: 'success',
      user: userWithoutPassword,
      token,
    });
  } catch (err) {
    if (err instanceof AuthenticationError) {
      res.status(401).json({
        error: 'Unauthorized',
        message: err.message,
      });
    } else if (err instanceof RegistrationError) {
      res.status(400).json({
        status: 'error',
        message: err.message,
      });
    } else {
      next(err);
    }
  }
};

export const meController = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = res.locals.user;

    if (!user) {
      throw new AuthenticationError('Unauthorized');
    }

    res.status(200).json({
      status: 'success',
      user,
    });
  } catch (err) {
    if (err instanceof AuthenticationError) {
      res.status(401).json({
        error: 'Unauthorized',
        message: err.message,
      });
    } else {
      next(err);
    }
  }
};
