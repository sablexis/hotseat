// src/middleware/cors.js
import cors from 'cors';

export const corsMiddleware = cors({
  origin: process.env.NEXTAUTH_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
});