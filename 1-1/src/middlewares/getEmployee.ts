import { Types } from "mongoose";
import { Employee, IEmployee } from "../models/employee";
import AppError from "../utils/appError";
import { Request, Response, NextFunction, RequestParamHandler } from "express";

const getEmployeeByNationalCode: RequestParamHandler = async (
  req: Request,
  res: Response,
  next: NextFunction,
  employeeNationalCode: string
) => {
  try {
    if (employeeNationalCode.length !== 10) {
      const err = AppError.badRequest("Invalid id");
      return next(err);
    }
    const employee = await Employee.find({
      nationalCode: employeeNationalCode,
    }).select("-__v");
    if (employee.length === 0) {
      const err = AppError.notFound("Employee not found");
      return next(err);
    }
    res.locals.employee = employee;
    next();
  } catch (error: unknown) {
    const err = AppError.internal((error as Error).message);
    next(err);
  }
};

export default getEmployeeByNationalCode;
