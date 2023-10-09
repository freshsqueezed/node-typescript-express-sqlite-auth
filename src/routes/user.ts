import { NextFunction, Request, Response, Router } from 'express';
import { User } from '../types';
import db from '../database/db';

const router = Router();

router.get(
  '/users',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await db<User>('users').select(
        'id',
        'username',
        'email',
        'created_at',
        'updated_at',
      );

      res.status(200).send({
        status: 'success',
        data: users,
      });
    } catch (err) {
      if (err instanceof Error) {
        next(err);
      }
    }
  },
);

export default router;
