import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwt.config.ts";

// Interface for decoded token
interface DecodedToken {
  id: string;
  email: string;
}

// Sign in access token
export const signInAccessToken = (payload: DecodedToken) => {
  return jwt.sign(payload, jwtConfig.access.secret as string, {
    expiresIn: jwtConfig.access.expiresIn as jwt.SignOptions["expiresIn"],
  });
};

// Sign in refresh token
export const signInRefreshToken = (payload: DecodedToken) => {
  return jwt.sign(payload, jwtConfig.refresh.secret as string, {
    expiresIn: jwtConfig.refresh.expiresIn as jwt.SignOptions["expiresIn"],
  });
};

// Verify access token
export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, jwtConfig.access.secret as string);
};

// Verify refresh token
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, jwtConfig.refresh.secret as string);
};

// Decode access token
export const decodeAccessToken = (token: string) => {
  return jwt.decode(token);
};

// Decode refresh token
export const decodeRefreshToken = (token: string) => {
  return jwt.decode(token);
};
