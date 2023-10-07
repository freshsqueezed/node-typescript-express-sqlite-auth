import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/tokens';
import { getUserById } from '../database/queries/user';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authToken = req.header('x-access-token');

  if (!authToken) {
    return next();
  }

  const [bearer, token] = authToken.split(' ');
  if (bearer.toLowerCase() !== 'bearer' || !token) {
    return next();
  }

  try {
    const data = await verifyToken(token);
    if (!data.sub) {
      return next();
    }

    const user = await getUserById(data.sub);
    if (!user) {
      return next();
    }

    const { password: _, ...userWithoutPassword } = user;

    res.locals.user = userWithoutPassword;
  } catch (err) {
    return next();
  }

  return next();
};
