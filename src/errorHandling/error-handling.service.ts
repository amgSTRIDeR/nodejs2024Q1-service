import { HttpException, Injectable } from '@nestjs/common';
import { LoggingService } from 'src/loggingService/logging.service';

@Injectable()
export class ErrorHandlingService {
  constructor(private logger: LoggingService) {
    process.on('uncaughtException', (error) => {
      this.logger.error(`Uncaught Exception: ${error.stack}`);
      throw new HttpException('uncaughtException', 500);
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error(
        `Unhandled Rejection at: ${promise}, reason: ${reason}`,
      );
      throw new HttpException('unhandledRejection', 500);
    });
  }
}
