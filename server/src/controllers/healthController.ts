import { Request, Response } from 'express';

const getHealth = (req: Request, res: Response) => {
  return res.json({ success: true, status: 'ok', service: 'Pronto!' });
};

export { getHealth }