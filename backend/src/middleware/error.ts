import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);

  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val: any) => val.message);
    return res.status(400).json({
      message: "Validation Error",
      errors: messages,
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: "Duplicate field value entered",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
