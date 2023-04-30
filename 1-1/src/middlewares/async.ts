import AppError from "../utils/appError";
import { Request, Response, NextFunction, RequestHandler } from "express";

export default function asyncMiddleware(
  handler: RequestHandler
): RequestHandler {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (error: any) {
      const ex = new AppError(error.message, "error", 500);
      return next(ex);
    }
  };
}
