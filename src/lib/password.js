// src/lib/password.js
import { compare } from 'bcryptjs';

export const verifyPassword = async (password, hashedPassword) => {
  return compare(password, hashedPassword);
};