import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = 'your_secret_key';

export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
