import { Request, Response } from 'express';

const getHealth = (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'Pronto!' });
};

export { getHealth }