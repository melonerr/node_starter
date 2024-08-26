import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import User from '../models/userModel';

// Load the private key for signing the JWT
const privateKey = fs.readFileSync(path.join(__dirname, '../keys/private.pem'), 'utf8');

// Mock login function (replace with real authentication logic)
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) { // Add proper password hashing/checking
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, email: user.email }, privateKey, {
      algorithm: 'RS256',
      expiresIn: '1h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
