import jwt from 'jsonwebtoken';

export const verifyToken = (token: string): { email: string; id: string; role: string } => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET||'none') as { email: string; id: string; role: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

