import { Document, Schema, model } from "mongoose";

export interface IEmployee extends Document {
  firstname: string;
  lastname: string;
  gender: "man" | "woman" | "not-set";
  dateOfBirth: Date;
  nationalCode: string;
  companyName: string;
  roleInCompany: "employee" | "manager";
}

const EmployeeSchema = new Schema<IEmployee>(
  {
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
        validator: function (v: string) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid nationalCode!`,
      },
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
  },
  {
    timestamps: {
      createdAt: "registrationDate",
      updatedAt: "updatedAt",
    },
  }
);

// Create the User model
export const Employee = model<IEmployee>("Employee", EmployeeSchema);
