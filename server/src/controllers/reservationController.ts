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
      return res.status(409).json({ success: false, error: 'This resource is already reserved for the selected time range' });
    }

    const reservation = await Reservation.create({
      resource,
      user,
      startDate,
      endDate,
      status: 'pending',
    });

    return res.status(201).json({ success: true, reservation });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create reservation' });
  }
};

export { createReservation };