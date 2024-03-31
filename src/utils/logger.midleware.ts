import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/loggingService/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: () => void) {
    const { ip, method, originalUrl } = req;
    res.on('finish', () => {
      this.logger.log(`${method}`);
    });
    next();
  }
}
