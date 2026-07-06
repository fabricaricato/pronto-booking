import { Request, Response } from 'express';
import { Reservation } from '../models/reservationModel';

const createReservation = async (req: Request, res: Response) => {
  try {
    const { resource, user, startDate, endDate } = req.body;

    const hasConflict = await Reservation.findOne({
      resource,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startDate: { $lt: endDate },
          endDate: { $gt: startDate },
        },
      ],
    });

    if (hasConflict) {
      return res.status(409).json({ error: 'This resource is already reserved for the selected time range' });
    }

    const reservation = await Reservation.create({
      resource,
      user,
      startDate,
      endDate,
      status: 'pending',
    });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create reservation' });
  }
};

export { createReservation };