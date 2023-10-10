import { NextFunction, Request, Response } from 'express';

export const ensureAuthenticated = (allowedRoles: string[]) => {
  return (_: Request, res: Response, next: NextFunction) => {
    if (!res.locals.user || !allowedRoles.includes(res.locals.user?.role)) {
      return res.status(403).json({
        status: 'failed',
        message: 'Insufficient permissions.',
      });
    } else {
      return next();
    }
  };
};
