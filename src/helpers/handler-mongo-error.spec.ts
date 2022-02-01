import { HandlerMongoError } from './handler-mongo-error';

describe('HandlerMongoError', () => {
  it('should be defined', () => {
    expect(new HandlerMongoError()).toBeDefined();
  });
});
