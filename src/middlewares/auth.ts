import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  (req as any).user = {
    _id: '62ee48ebac24c26533c50b9a',
  };

  next();
};
