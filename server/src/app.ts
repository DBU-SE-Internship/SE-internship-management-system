import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';

const app: Application = express();

// Global CORS Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
  })
);

// Better Auth Wildcard Route Handler (Handles /api/auth/*)
app.all('/api/auth/*', toNodeHandler(auth));

// Body Parsing Middlewares (Mounted after Better Auth handler)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic Health Check Endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'SEIMS Backend API',
    timestamp: new Date().toISOString(),
  });
});

export default app;
