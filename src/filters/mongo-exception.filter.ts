import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongoose/node_modules/mongodb';
import { HandlerMongoError } from 'src/helpers/handler-mongo-error';

/**
 * Exception filter to handle only Native Mongodb errors (NOT MONGOOSE ERRORS).
 */
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    return HandlerMongoError.handleError(response, exception);
  }
}
