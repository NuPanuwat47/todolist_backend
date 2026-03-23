import 'express';

declare global {
  namespace Express {
    interface Request {
      admin?: {
        id: number;
        username: string;
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
      };
    }
  }
}

export {};
