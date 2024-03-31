import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingService {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  log(message: object) {
    this.logger.log(JSON.stringify(message));
  }
}
