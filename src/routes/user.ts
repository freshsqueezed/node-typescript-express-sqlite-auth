import { Router } from 'express';
import {
  deleteUserController,
  getUserByIdController,
  getUsersController,
  newUserController,
  updateUserController,
} from '../controllers/user';

const router = Router();

router.get('/users', getUsersController);
router.get('/users/:id', getUserByIdController);
router.post('/users', newUserController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export default router;
