import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY || 'default';

interface CustomRequest extends Request {
  user?: string | object;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    res.status(401).json({ message: 'Access Denied' });
    return
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Access Denied' });
    return;
  }

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified as any; 
    next(); 
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
    return;
  }
};
