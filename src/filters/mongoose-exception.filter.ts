import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';
import { Error as mongooseError } from 'mongoose';

@Catch(mongooseError.ValidationError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: mongooseError.ValidationError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const { errors } = exception;

    const formattedErrors = Object.keys(errors).map(e => {
      const err = errors[e];

      return {
        path: e,
        message: err.message
      };
    });

    return response.status(400).json({
      errors: formattedErrors
    });
  }
}