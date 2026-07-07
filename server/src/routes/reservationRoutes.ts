import { Router } from 'express';
import { createReservation, getReservations } from '../controllers/reservationController';

const router = Router();

router.get('/', getReservations);
router.post('/', createReservation);

export { router as reservationRoutes };