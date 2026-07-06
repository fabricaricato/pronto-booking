import { Request, Response } from 'express';
import { Resource } from '../models/resourceModel';

const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.create(req.body);
    return res.status(201).json({ success: true, resource });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create resource' });
  }
};

export { createResource };