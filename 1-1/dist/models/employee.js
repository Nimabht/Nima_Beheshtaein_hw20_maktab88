"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const EmployeeSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
        lowercase: true,
    },
    gender: {
        type: String,
        enum: ["man", "woman", "not-set"],
        default: "not-set",
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    nationalCode: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^\d{10}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid nationalCode!`,
        },
        index: true,
    },
    companyName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 40,
    },
    roleInCompany: {
        type: String,
        enum: ["employee", "manager"],
        default: "employee",
    },
}, {
    timestamps: {
        createdAt: "registrationDate",
        updatedAt: "updatedAt",
    },
});
// Create the User model
exports.Employee = (0, mongoose_1.model)("Employee", EmployeeSchema);
