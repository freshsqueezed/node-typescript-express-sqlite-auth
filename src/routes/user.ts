import { Router } from 'express';
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  newUserController,
  updateUserController,
} from '../controllers/user';
import { ensureAuthenticated } from '../utils/auth';
import { Role } from '../types';

const router = Router();

router.get(
  '/users',
  ensureAuthenticated([Role.ADMIN, Role.USER]),
  getUsersController,
);

router.get(
  '/users/:id',
  ensureAuthenticated([Role.ADMIN, Role.USER]),
  getUserByIdController,
);

router.post(
  '/users',
  ensureAuthenticated([Role.ADMIN, Role.USER]),
  newUserController,
);

router.put(
  '/users/:id',
  ensureAuthenticated([Role.ADMIN, Role.USER]),
  updateUserController,
);

router.delete(
  '/users/:id',
  ensureAuthenticated([Role.ADMIN, Role.USER]),
  deleteUserController,
);

export default router;
