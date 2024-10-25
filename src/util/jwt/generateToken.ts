import jwt from 'jsonwebtoken';

interface TokenPayload {
  email: string;
  id: string;
  role: string;
}

export const generateToken = (payload: any): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || "none", { expiresIn: '1h' });
};
