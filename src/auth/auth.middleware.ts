import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const excludedPaths = ['/auth/signup', '/auth/login', '/doc', '/'];
    const isExcludedPath = excludedPaths.includes(req.originalUrl);

    if (!isExcludedPath) {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }

      const token = authHeader.substring(7);
      try {
        jwt.verify(token, process.env.JWT_SECRET_KEY);
      } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    }

    next();
  }
}
