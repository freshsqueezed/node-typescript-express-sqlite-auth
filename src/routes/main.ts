import { Router } from 'express';
import { helloWorldController } from '../controllers/main';

const router = Router();

router.get('/', helloWorldController);

export default router;
