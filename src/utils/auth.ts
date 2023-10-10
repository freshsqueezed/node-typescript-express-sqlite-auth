import { NextFunction, Request, Response } from 'express';

export const ensureAuthenticated = (allowedRoles: string[]) => {
  return (_: Request, res: Response, next: NextFunction) => {
    const userRoles: string[] = JSON.parse(res.locals.user?.roles) || [];

    if (userRoles.some((role) => allowedRoles.includes(role.toLowerCase()))) {
      return next();
    } else {
      return res.status(403).json({
        status: 'failed',
        message: 'Insufficient permissions.',
      });
    }
  };
};
