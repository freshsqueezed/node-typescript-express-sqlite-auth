import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Log the error for debugging purposes
  console.error(err);

  // Define a default error status and message
  let status = 500;
  let message = 'Internal Server Error';

  // Include a stack trace for debugging purposes in development mode
  if (process.env.NODE_ENV !== 'production') {
    const stackTrace = err.stack;
    // You can also log the stack trace separately or use a logging library
    console.error(stackTrace);
  }

  // Send an error response to the client
  res.status(status).json({ error: message });
};
