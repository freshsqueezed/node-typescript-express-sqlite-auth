import { NextFunction, Request, Response } from 'express';
import { TOKEN_NAME } from '../config';
import { getUserById } from '../database/queries/user';
import { verifyToken } from '../utils/tokens';

const authMiddleware = async (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies[TOKEN_NAME];

  if (!accessToken) {
    return next();
  }

  try {
    const data = await verifyToken(accessToken);

    if (!data.sub) {
      return next();
    }

    const user = await getUserById(data.sub);

    if (!user) {
      return next();
    }

    const { password: _, ...userWithoutPassword } = user;

    req.user = userWithoutPassword;
  } catch {
    return next();
  }

  return next();
};

export default authMiddleware;
