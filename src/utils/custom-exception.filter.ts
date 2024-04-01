import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from 'src/loggingService/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      message: 'Internal server error',
    });

    if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error({ message: exception.message, status: status });
    } else if (status >= HttpStatus.BAD_REQUEST) {
      this.logger.warn({ message: exception.message, status: status });
    }
  }
}
