import { createTokenFromUser, verifyToken } from '../../src/utils/tokens';

describe('Tokens', () => {
  describe('createToken', () => {
    it('should create a token', async () => {
      const token = await createTokenFromUser({ id: 1 }, '1hr');

      expect(token).toStrictEqual(expect.any(String));
    });
  });

  describe('verifyToken', () => {
    it('should return true for a valud token', async () => {
      const token = await createTokenFromUser({ id: 1 }, '1hr');
      const data = await verifyToken(token);

      expect(data).toBeTruthy();
      expect(data).toHaveProperty('exp', expect.any(Number));
      expect(data).toHaveProperty('iat', expect.any(Number));
      expect(data).toHaveProperty('sub', 1);
    });
  });
});
