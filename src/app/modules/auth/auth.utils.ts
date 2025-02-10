import jwt, { SignOptions } from 'jsonwebtoken';

export const createAccessToken = (
  jwtPayload: { userId: string; role: string },
  secret: string,
  expiresIn:string| number 
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  } as SignOptions);
};
