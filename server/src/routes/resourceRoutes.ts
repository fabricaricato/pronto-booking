import { Router } from 'express';
import { createResource, getResources } from '../controllers/resourceController';

const router = Router();

router.get('/', getResources);
router.post('/', createResource);

export { router as resourceRoutes };