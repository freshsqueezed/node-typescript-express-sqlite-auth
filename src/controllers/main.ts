import { NextFunction, Request, Response } from 'express';

export const helloWorldController = (
  _: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    res.status(200).send({
      message: 'hello world!',
    });
  } catch (err) {
    next(err);
  }
};
