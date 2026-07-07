import { Request, Response } from 'express';
import { Resource } from '../models/resourceModel';

const getResources = async (req: Request, res: Response) => {
  try {
    const resources = await Resource.find();
    return res.json({ success: true, resources });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch resources' });
  }
};

const createResource = async (req: Request, res: Response) => {
  try {
    const resource = await Resource.create(req.body);
    return res.status(201).json({ success: true, resource });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create resource' });
  }
};

export { createResource, getResources };