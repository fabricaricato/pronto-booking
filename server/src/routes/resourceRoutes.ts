import { Router } from 'express';
import { createResource, getResources } from '../controllers/resourceController';
import { isAdmin } from '../middleware/roleMiddleware';

const router = Router();

router.get('/', getResources);
router.post('/', isAdmin, createResource);

export { router as resourceRoutes };