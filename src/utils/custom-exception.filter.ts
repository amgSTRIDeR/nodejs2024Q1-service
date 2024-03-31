import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { LoggingService } from 'src/loggingService/logging.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private logger: LoggingService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    response.json({
      statusCode: 500,
      message: 'Internal server error',
    });

    this.logger.error(exception.message);
  }
}
