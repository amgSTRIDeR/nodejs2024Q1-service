import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/loggingService/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggingService) {}

  use(req: Request, res: Response, next: () => void) {
    const { url, originalUrl, query, body, method } = req;
    const { statusCode } = res;

    res.on('finish', () => {
      this.logger.log({ url, originalUrl, query, body, method, statusCode });
    });

    next();
  }
}