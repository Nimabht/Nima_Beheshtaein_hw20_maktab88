"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = __importDefault(require("winston"));
const options = {
    file: {
        level: "info",
        filename: "info.log",
        handleExceptions: true,
        maxsize: 5242880,
        maxFiles: 10,
        format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json(), winston_1.default.format.prettyPrint()),
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston_1.default.format.combine(winston_1.default.format.simple()),
    },
};
const logger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File(options.file),
        new winston_1.default.transports.Console(options.console),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
exports.default = (Error, req, res, next) => {
    if (!Error.statusCode || Error.statusCode.toString().startsWith("5")) {
        logger.error(Error.message, { metadata: Error });
    }
    res.status(Error.statusCode || 500).send({
        error: Error.status || "error",
        message: Error.statusCode.toString().startsWith("5")
            ? "Internal Server Error"
            : Error.message,
    });
};
