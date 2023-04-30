"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = (employee) => {
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().min(3).max(30).required().messages({
            "string.base": `Firstname should be a type of 'text'`,
            "string.empty": `Firstname cannot be an empty field`,
            "string.min": `Firstname should have a minimum length of {#limit}`,
            "string.max": `Firstname should have a maximum length of {#limit}`,
            "any.required": `Firstname is a required field`,
        }),
        lastname: joi_1.default.string().min(3).max(30).required().messages({
            "string.base": `Lastname should be a type of 'text'`,
            "string.empty": `Lastname cannot be an empty field`,
            "string.min": `Lastname should have a minimum length of {#limit}`,
            "string.max": `Lastname should have a maximum length of {#limit}`,
            "any.required": `Lastname is a required field`,
        }),
        gender: joi_1.default.string()
            .valid("man", "woman", "not-set")
            .default("not-set")
            .messages({
            "string.base": `Gender should be a type of 'text'`,
            "any.only": `Gender should be either 'man', 'woman', or 'not-set'`,
            "any.default": `Gender should default to 'not-set'`,
        }),
        dateOfBirth: joi_1.default.date().required().messages({
            "date.base": `Date of birth should be a type of 'date'`,
            "any.required": `Date of birth is a required field`,
        }),
        nationalCode: joi_1.default.string()
            .pattern(/^\d{10}$/)
            .required()
            .messages({
            "string.base": `National code should be a type of 'text'`,
            "string.pattern.base": `National code should have exactly 10 digits`,
            "any.required": `National code is a required field`,
        }),
        companyName: joi_1.default.string().min(2).max(40).required().messages({
            "string.base": `Company name should be a type of 'text'`,
            "string.empty": `Company name cannot be an empty field`,
            "string.min": `Company name should have a minimum length of {#limit}`,
            "string.max": `Company name should have a maximum length of {#limit}`,
            "any.required": `Company name is a required field`,
        }),
        roleInCompany: joi_1.default.string()
            .valid("employee", "manager")
            .default("employee")
            .messages({
            "string.base": `Role in company should be a type of 'text'`,
            "any.only": `Role in company should be either 'employee' or 'manager'`,
            "any.default": `Role in company should default to 'employee'`,
        }),
        registrationDate: joi_1.default.date().forbidden().messages({
            "any.unknown": `Registration date is not allowed`,
        }),
    });
    return schema.validate(employee);
};
