import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggingService {
  logger: Logger;
  logsDir = path.resolve(__dirname, '../../logs');
  currentLogFilePath = path.resolve(this.logsDir, new Date().toDateString());

  constructor() {
    this.logger = new Logger();

    fs.mkdir(this.logsDir, { recursive: true });
  }

  log(message: object) {
    this.logger.log(JSON.stringify(message));
    this.writeToFile(JSON.stringify(message));
  }

  error(message: string) {
    this.logger.error(message);
    this.writeToFile(message);
  }

  async writeToFile(message: string) {
    const currentDate = new Date().toDateString();
    const logMessage = `${currentDate}: ${message}\n`;
    await fs.writeFile(this.currentLogFilePath, logMessage, { flag: 'a' });
  }
}
