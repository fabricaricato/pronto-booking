import { Response, NextFunction } from 'express';
import { AuthRequest } from './authMiddleware';
import { User } from '../models/userModel';

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ success: false, error: 'Unauthorized' });

    const user = await User.findById(userId).select('role');
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    if ((user.role as string) !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin role required' });
    }

    return next();
  } catch (err) {
    return res.status(500).json({ success: false, error: 'Failed to verify role' });
  }
};

export default isAdmin;
