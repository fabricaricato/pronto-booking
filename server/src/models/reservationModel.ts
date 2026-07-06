import { Schema, model, Document, Types } from 'mongoose';

export interface IReservation extends Document {
  resource: Types.ObjectId;
  user: Types.ObjectId;
  startDate: Date;
  endDate: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const reservationSchema = new Schema<IReservation>({
  resource: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

export const Reservation = model<IReservation>('Reservation', reservationSchema);
