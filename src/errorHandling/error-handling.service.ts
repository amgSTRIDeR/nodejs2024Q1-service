import { Injectable } from '@nestjs/common';
import { LoggingService } from 'src/loggingService/logging.service';

@Injectable()
export class ErrorHandlingService {
  constructor(private logger: LoggingService) {
    process.on('uncaughtException', (error) => {
      this.logger.error({ message: error.message, status: 500 });
    });

    process.on('unhandledRejection', (reason, promise) => {
      this.logger.error({ message: reason, status: 500 });
    });
  }
}
