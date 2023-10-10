import { NextFunction, Request, Response } from 'express';
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../database/queries/user';

export const getUsersController = async (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await getAllUsers();

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

export const newUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await createUser(req.body);

    res.status(200).send({
      status: 'success',
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await updateUser(req.params.id, req.body);

    res.status(200).send({
      status: 'success',
      data: user,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await deleteUser(req.params.id);

    res.status(200).send({
      status: 'success',
      data: `User successfully deleted.`,
    });
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }
  }
};
