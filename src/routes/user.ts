import { Router } from 'express';
import { getUserByIdController, getUsersController } from '../controllers/user';

const router = Router();

router.get('/users', getUsersController);
router.get('/users/:id', getUserByIdController);

export default router;
