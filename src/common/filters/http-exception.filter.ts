import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

interface MulterLikeError extends Error {
  code?: string;
  field?: string;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let code = 'INTERNAL_SERVER_ERROR';
    let details: any = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object') {
        const responseObj = exceptionResponse as any;
        message = responseObj.message || exception.message;
        code = responseObj.code || exception.name;
        details = responseObj.details || null;
      }
    } else if (this.isMulterError(exception)) {
      status = HttpStatus.BAD_REQUEST;
      code = exception.code || 'MULTER_ERROR';

      if (exception.code === 'LIMIT_FILE_SIZE') {
        message = 'File is too large';
      } else if (exception.code === 'LIMIT_UNEXPECTED_FILE') {
        message = 'Unexpected file field. Use form field name "file"';
      } else {
        message = exception.message;
      }

      details = { field: exception.field };
    } else if (exception instanceof Error) {
      message = exception.message;
      code = exception.name;
    }

    const errorResponse: {
      error: {
        message: string;
        code: string;
        details?: any;
      };
    } = {
      error: {
        message,
        code,
      },
    };

    if (details) {
      errorResponse.error.details = details;
    }

    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${message}`,
      exception instanceof Error ? exception.stack : undefined,
    );

    response.status(status).json(errorResponse);
  }

  private isMulterError(exception: unknown): exception is MulterLikeError {
    return (
      exception instanceof Error &&
      exception.name === 'MulterError' &&
      'code' in exception &&
      typeof (exception as MulterLikeError).code === 'string'
    );
  }
}
