import { Schema, model, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  location: string;
  capacity: number;
  availableFrom: string;
  availableTo: string;
}

const resourceSchema = new Schema<IResource>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  availableFrom: { type: String, required: true },
  availableTo: { type: String, required: true },
}, { timestamps: true });

export const Resource = model<IResource>('Resource', resourceSchema);
