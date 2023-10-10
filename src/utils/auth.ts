import { NextFunction, Request, Response } from 'express';

export const ensureAuthenticated = (allowedRoles: string[] | undefined) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized. Please log in.',
      });
    } else if (!allowedRoles || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'failed',
        message: 'Insufficient permissions.',
      });
    } else {
      return next();
    }
  };
};
