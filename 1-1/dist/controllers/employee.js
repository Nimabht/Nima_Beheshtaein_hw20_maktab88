"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../models/employee");
const appError_1 = __importDefault(require("../utils/appError"));
const employee_2 = __importDefault(require("../validators/employee"));
exports.default = {
    getAllEmployees: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!res.locals.query) {
            const employees = yield employee_1.Employee.find().select("-__v");
            res.send(employees);
        }
        else {
            const filter = res.locals.filter;
            const sort = res.locals.sort;
            const employees = yield employee_1.Employee.find(filter).sort(sort).select("-__v");
            res.send(employees);
        }
    }),
    getEmployeeByNationalCode: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const employee = res.locals.employee;
        res.send(employee);
    }),
    createEmployee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = req.body;
        const { error, value } = (0, employee_2.default)(requestBody);
        if (!!error) {
            const err = appError_1.default.badRequest(error.details[0].message);
            return next(err);
        }
        // Check if nationalCode already exists in database
        const existingEmployee = yield employee_1.Employee.exists({
            nationalCode: value.nationalCode,
        });
        if (!!existingEmployee) {
            const err = appError_1.default.badRequest("Use another ID number.");
            return next(err);
        }
        const newEmployee = new employee_1.Employee(value);
        yield newEmployee.save();
        res.status(201).send(newEmployee);
    }),
    updateEmployee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const requestBody = req.body;
        const { error, value } = (0, employee_2.default)(requestBody);
        if (!!error) {
            const err = appError_1.default.badRequest(error.details[0].message);
            return next(err);
        }
        const employee = res.locals.employee[0];
        // Check if nationalCode already exists in database
        const existingEmployee = yield employee_1.Employee.exists({
            nationalCode: value.nationalCode,
            _id: { $ne: employee._id },
        });
        if (!!existingEmployee) {
            const err = appError_1.default.badRequest("Use another ID number.");
            return next(err);
        }
        const { firstname, lastname, gender, dateOfBirth, nationalCode, companyName, roleInCompany, } = value;
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
        yield employee.save();
        const filteredEmployee = Object.assign({}, employee.toObject());
        delete filteredEmployee.__v;
        res.status(200).send(filteredEmployee);
    }),
    deleteEmployee: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield res.locals.employee[0].deleteOne();
        res.status(204).end();
    }),
};
