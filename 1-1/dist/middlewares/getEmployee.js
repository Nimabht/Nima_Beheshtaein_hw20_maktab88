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
const getEmployeeByNationalCode = (req, res, next, employeeNationalCode) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (employeeNationalCode.length !== 10) {
            const err = appError_1.default.badRequest("Invalid id");
            return next(err);
        }
        const employee = yield employee_1.Employee.find({
            nationalCode: employeeNationalCode,
        }).select("-__v");
        if (employee.length === 0) {
            const err = appError_1.default.notFound("Employee not found");
            return next(err);
        }
        res.locals.employee = employee;
        next();
    }
    catch (error) {
        const err = appError_1.default.internal(error.message);
        next(err);
    }
});
exports.default = getEmployeeByNationalCode;
