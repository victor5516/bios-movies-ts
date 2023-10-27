import { NextFunction, Request, Response } from "express";

export class ResponseHandler {
  statusCode: number;
  result: any;
  message?: string;

  constructor(statusCode: number, result: any, message?: string) {
    this.statusCode = statusCode;
    (this.result = result), (this.message = message);
  }
}

export const handleResponse = (
  info: ResponseHandler,
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  if (info instanceof Error) {
    next(info);
  }

  if (info instanceof ResponseHandler) {
    const { statusCode, message, result } = info;

    res.status(statusCode).json({
      status: "SUCCESS",
      statusCode,
      message,
      result,
    });
  } else {
    res.json(info);
  }
};