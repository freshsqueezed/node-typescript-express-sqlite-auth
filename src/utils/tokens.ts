import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { User } from '../types';
import { TOKEN_SECRET } from '../config';

export const createTokenFromUser = async (
  user: Partial<User>,
  expiresIn: string,
): Promise<string> => {
  return sign(
    {
      sub: user.id,
    },
    TOKEN_SECRET,
    { algorithm: 'HS256', expiresIn },
  );
};

export async function verifyToken(token: string): Promise<JwtPayload> {
  return (await verify(token, TOKEN_SECRET)) as JwtPayload;
}
