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
    if (this.loggingLevel >= 2) {
      this.logger.log(JSON.stringify(message));
      this.writeToFile(JSON.stringify({ type: 'log', ...message }), 'log');
    }
  }

  error(message: object) {
    if (this.loggingLevel >= 0) {
      this.logger.error(message);
      this.writeToFile(JSON.stringify({ type: 'error', ...message }), 'error');
    }
  }

  warn(message: object) {
    if (this.loggingLevel >= 2) {
      this.logger.warn(JSON.stringify(message));
      this.writeToFile(JSON.stringify({ type: 'warning', ...message }), 'warn');
    }
  }

  async writeToFile(message: string, flag = 'log') {
    let filePath =
      flag === 'log' || 'warn'
        ? this.currentLogFilePath
        : this.currentErrorLogFilePath;
    const currentDate = new Date().toString();
    const logMessage = `${currentDate}: ${message}\n`;

    const fileSize = await this.getFileSize(filePath);

    if (fileSize >= this.maxLogFileSize) {
      this.logFileNumber++;
      switch (flag) {
        case 'log':
          this.currentLogFilePath = path.resolve(
            this.logsDir,
            `Log ${this.logFileNumber} - ${new Date().toDateString()}`,
          );
          filePath = this.currentLogFilePath;
          break;
        case 'warn':
          this.currentLogFilePath = path.resolve(
            this.logsDir,
            `Log ${this.logFileNumber} - ${new Date().toDateString()}`,
          );
          filePath = this.currentLogFilePath;
          break;
        case 'error':
          this.errorFileNumber++;
          this.currentErrorLogFilePath = path.resolve(
            this.logsDir,
            `Error ${this.errorFileNumber} - ${new Date().toDateString()}`,
          );
          filePath = this.currentErrorLogFilePath;
          break;
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
