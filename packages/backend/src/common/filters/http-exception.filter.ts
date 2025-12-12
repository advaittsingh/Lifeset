import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: string;
    let details: any = undefined;

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse();
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || exception.message || 'An error occurred';
        // If message is an array (validation errors), join them
        if (Array.isArray(message)) {
          message = message.join(', ');
        }
        details = responseObj;
      } else {
        message = exception.message || 'An error occurred';
      }
    } else {
      // Log unexpected errors for debugging
      const error = exception as Error;
      this.logger.error(
        `Unexpected error: ${error.message || 'Unknown error'}`,
        error.stack,
        `${request.method} ${request.url}`,
      );
      message = error.message || 'Internal server error';
    }

    response.status(status).json({
      success: false,
      error: {
        code: status,
        message,
        details,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

