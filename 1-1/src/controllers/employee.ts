import { Employee, IEmployee } from "../models/employee";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import validateEmployee from "../validators/employee";

interface employeeRequestBody {
  firstname: string;
  lastname: string;
  gender?: "man" | "woman" | "not-set";
  dateOfBirth: string;
  nationalCode: string;
  companyName: string;
  roleInCompany?: "employee" | "manager";
}

export default {
  getAllEmployees: async (req: Request, res: Response, next: NextFunction) => {
    if (!res.locals.query) {
      const employees = await Employee.find().select("-__v");
      res.send(employees);
    } else {
      const filter = res.locals.filter;
      const sort = res.locals.sort;

      const employees = await Employee.find(filter).sort(sort).select("-__v");
      res.send(employees);
    }
  },

  getEmployeeByNationalCode: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const employee = res.locals.employee;
    res.send(employee);
  },
  createEmployee: async (req: Request, res: Response, next: NextFunction) => {
    const requestBody: employeeRequestBody = req.body;
    const { error, value } = validateEmployee(requestBody);
    if (!!error) {
      const err = AppError.badRequest(error.details[0].message);
      return next(err);
    }
    // Check if nationalCode already exists in database
    const existingEmployee = await Employee.exists({
      nationalCode: value.nationalCode,
    });
    if (!!existingEmployee) {
      const err = AppError.badRequest("Use another ID number.");
      return next(err);
    }
    const newEmployee = new Employee(value);
    await newEmployee.save();
    res.status(201).send(newEmployee);
  },
  updateEmployee: async (req: Request, res: Response, next: NextFunction) => {
    const requestBody: employeeRequestBody = req.body;
    const { error, value } = validateEmployee(requestBody);
    if (!!error) {
      const err = AppError.badRequest(error.details[0].message);
      return next(err);
    }
    const employee = res.locals.employee[0];
    // Check if nationalCode already exists in database
    const existingEmployee = await Employee.exists({
      nationalCode: value.nationalCode,
      _id: { $ne: employee._id },
    });
    if (!!existingEmployee) {
      const err = AppError.badRequest("Use another ID number.");
      return next(err);
    }
    const {
      firstname,
      lastname,
      gender,
      dateOfBirth,
      nationalCode,
      companyName,
      roleInCompany,
    } = value;
    console.log(gender);

    employee.set({
      firstname,
      lastname,
      gender,
      dateOfBirth,
      nationalCode,
      companyName,
      roleInCompany,
    });
    await employee.save();
    const filteredEmployee = { ...employee.toObject() };
    delete filteredEmployee.__v;
    res.status(200).send(filteredEmployee);
  },
  deleteEmployee: async (req: Request, res: Response, next: NextFunction) => {
    await res.locals.employee[0].deleteOne();
    res.status(204).end();
  },
};
