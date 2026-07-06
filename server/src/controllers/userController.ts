import { Request, Response } from 'express';
import { User } from '../models/userModel';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to create user' });
  }
};

export { createUser };