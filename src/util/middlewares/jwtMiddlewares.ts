import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'; 

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}


export const jwtMiddleware = (req: Request, res: Response, next: NextFunction): any => {
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  console.log('this is the token',req.cookies.token);

  if (!token) {
    return res.status(401).json({
      message: 'Unauthorized. Token is missing.',
    });
  }

  try {
    
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'none');

    
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };

    next(); 
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        message: 'Token has expired. Please login again.',
      });
    }

    return res.status(403).json({
      message: 'Invalid token. Access forbidden.',
    });
  }
};
