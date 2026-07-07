import { Router } from 'express';
import { createUser } from '../controllers/userController';
import { isAdmin } from '../middleware/roleMiddleware';

const router = Router();

router.post('/', isAdmin, createUser);

export { router as userRoutes };