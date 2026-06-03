import jwt from 'jsonwebtoken';
export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET || 'change_this_secret', { expiresIn: '7d' });
