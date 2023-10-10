import { Router } from 'express';
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  newUserController,
  updateUserController,
} from '../controllers/user';
import { ensureAuthenticated } from '../utils/auth';

const router = Router();

router.get(
  '/users',
  ensureAuthenticated(['ADMIN', 'USER']),
  getUsersController,
);
router.get(
  '/users/:id',
  ensureAuthenticated(['ADMIN', 'USER']),
  getUserByIdController,
);
router.post('/users', ensureAuthenticated, newUserController);
router.put('/users/:id', ensureAuthenticated, updateUserController);
router.delete('/users/:id', ensureAuthenticated, deleteUserController);

export default router;
