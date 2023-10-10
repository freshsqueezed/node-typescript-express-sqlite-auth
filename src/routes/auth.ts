import { Router } from 'express';
import {
  loginController,
  registerController,
  meController,
  logoutController,
} from '../controllers/auth';

const router = Router();

router.post('/auth/login', loginController);
router.post('/auth/register', registerController);
router.post('/auth/logout', logoutController);
router.get('/auth/me', meController);

export default router;
