import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggingService {
  logger: Logger;
  logsDir = path.resolve(__dirname, '../../logs');
  logFileNumber = 0;
  currentLogFilePath = path.resolve(
    this.logsDir,
    `${this.logFileNumber} - ${new Date().toDateString()}`,
  );

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
    const currentDate = new Date().toString();
    const logMessage = `${currentDate}: ${message}\n`;
    const maxLogFileSize = process.env.MAX_LOG_FILE_SIZE;
    const fileSize = await this.getFileSize();

    console.log(fileSize);
    if (fileSize >= +maxLogFileSize) {
      this.logFileNumber++;
      this.currentLogFilePath = path.resolve(
        this.logsDir,
        `${this.logFileNumber} - ${new Date().toDateString()}`,
      );
    }
    await fs.writeFile(this.currentLogFilePath, logMessage, { flag: 'a' });
  }

  async getFileSize() {
    try {
      const stats = await fs.stat(this.currentLogFilePath);
      return stats.size;
    } catch {
      return 0;
    }
  }
}
