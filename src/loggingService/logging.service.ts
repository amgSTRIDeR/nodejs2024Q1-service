import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class LoggingService {
  logger: Logger;
  logsDir = path.resolve(__dirname, '../../logs');
  logFileNumber = 0;
  errorFileNumber = 0;
  currentLogFilePath = path.resolve(
    this.logsDir,
    `Log ${this.logFileNumber} - ${new Date().toDateString()}.log`,
  );
  currentErrorLogFilePath = path.resolve(
    this.logsDir,
    `Error ${this.logFileNumber} - ${new Date().toDateString()}.log`,
  );
  private maxLogFileSize = +process.env.MAX_LOG_FILE_SIZE || 3000;
  private loggingLevel = +process.env.LOGGING_LEVEL || 3;

  constructor() {
    this.logger = new Logger();

    fs.mkdir(this.logsDir, { recursive: true });
  }

  log(message: object) {
    this.logger.log(JSON.stringify(message));
    this.writeToFile(JSON.stringify(message), 'log');
  }

  error(message: object) {
    this.logger.error(message);
    this.writeToFile(JSON.stringify(message), 'error');
  }

  async writeToFile(message: string, flag = 'log') {
    let filePath =
      flag === 'log' ? this.currentLogFilePath : this.currentErrorLogFilePath;
    const currentDate = new Date().toString();
    const logMessage = `${currentDate}: ${message}\n`;

    const fileSize = await this.getFileSize(filePath);

    if (fileSize >= this.maxLogFileSize) {
      this.logFileNumber++;
      if (flag === 'log') {
        this.currentLogFilePath = path.resolve(
          this.logsDir,
          `Log ${this.logFileNumber} - ${new Date().toDateString()}`,
        );
        filePath = this.currentLogFilePath;
      } else {
        this.errorFileNumber++;
        this.currentErrorLogFilePath = path.resolve(
          this.logsDir,
          `Error ${this.errorFileNumber} - ${new Date().toDateString()}`,
        );
        filePath = this.currentErrorLogFilePath;
      }
    }

    await fs.writeFile(filePath, logMessage, { flag: 'a' });
  }

  async getFileSize(filePath: string) {
    try {
      const stats = await fs.stat(filePath);
      return stats.size;
    } catch {
      return 0;
    }
  }
}
