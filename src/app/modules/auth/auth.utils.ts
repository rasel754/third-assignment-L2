import jwt from 'jsonwebtoken';

export const createAccessToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload,secret,  {
    expiresIn,
  });
};
