import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  log(message: string) {
    this.logger.log(message);
  }
}
