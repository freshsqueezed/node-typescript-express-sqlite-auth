import { NextFunction, Request, Response } from 'express';
import { TOKEN_NAME } from '../config';
import { getUserById } from '../database/queries/user';
import { verifyToken } from '../utils/tokens';

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.cookies[TOKEN_NAME] as string;

  if (!accessToken) {
    return next();
  }

  try {
    const data = await verifyToken(accessToken);

    if (!data.sub) {
      return next();
    }

    res.locals.user = await getUserById(data.sub);
  } catch {
    return next();
  }

  return next();
};

export default authMiddleware;
