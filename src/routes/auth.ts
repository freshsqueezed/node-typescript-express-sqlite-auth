import { Router } from 'express';
import {
  loginController,
  registerController,
  meController,
} from '../controllers/auth';

const router = Router();

router.post('/auth/login', loginController);
router.post('/auth/register', registerController);
router.get('/auth/me', meController);

export default router;
