import { Request, Response } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_me';

const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ success: false, error: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ success: false, error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, password: hashed, name, role });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({ success: true, token });
    } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to register user' });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false, error: 'Missing fields' });

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    return res.status(201).json({ success: true, token });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to login' });
  }
};

export { register, login };