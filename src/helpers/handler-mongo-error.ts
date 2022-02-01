import { Response } from 'express';
import { MongoError, MongoServerError } from 'mongoose/node_modules/mongodb';

/**
 * Utility class for MongoDB native errors handling (is not for mongoose errors)
 */
export abstract class HandlerMongoError {
  /**
   * Interface method to be used.
   * Every specific error handler method should be placed inside
   * the switch statement according to the errorcode in order to be handled.
   * 
   * @param res - response object instances to send response to client.
   * @param exception - the error that needs to be handled.
   * @returns response sent to the client
   */
  static handleError(res: Response, exception: MongoError): Response {
    switch (exception.code) {
      case 11000:
        this.handleDuplicateField(res, exception);
        break;
      default:
        console.log(exception);
        return res.sendStatus(500).json({
          statusCode: 500,
          message: 'Internal Server Error',
        });
    }
  }

  static handleDuplicateField(res: Response, exception: MongoError) {
    const err: MongoServerError = exception;
    const field = Object.keys(err.keyValue);
    const value = Object.values(err.keyValue);

    return res.status(400).json({
      statusCode: 400,
      message: `Field ${field} must be unique. Document with field ${field}=${value} already exist`,
    });
  }
}
