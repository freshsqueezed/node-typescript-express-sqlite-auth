import { NextFunction, Request, Response } from 'express';
import { getAllUsers, getUserById } from '../database/queries/user';

export const getUsersController = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();

    if (!users.length) {
      throw new Error('No users exist.');
    }

    res.status(200).send({
      status: 'success',
      data: users,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await getUserById(req.params.id);

    if (!user) {
      throw new Error('user does not exist.');
    }

    const { password: _, ...userWithoutPassword } = user;

    res.status(200).send({
      status: 'success',
      data: userWithoutPassword,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};
