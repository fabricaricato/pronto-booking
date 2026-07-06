import { Request, Response } from 'express';
import { Resource } from '../models/resourceModel';

const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create resource' });
  }
};

export { createResource };