import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authutils'; 
;

export const authMiddleware = (req: any, res: Response, next: NextFunction): void => {
 const token = req.headers.authorization?.split(' ')[1];
  {
  const token = req.headers.authorization?.split(' ')[1]; 
  
  if (!token)  
    res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = verifyToken(token);
    req.params.userId = (decoded as any).userId; 
    next();
  } catch (error) {
     res.status(401).json({ error: 'Invalid or expired token' });
  }
}
}