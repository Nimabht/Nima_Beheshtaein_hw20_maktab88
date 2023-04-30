"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const employee_1 = __importDefault(require("./routes/employee"));
const globalErrorHandler_js_1 = __importDefault(require("./middlewares/globalErrorHandler.js"));
mongoose_1.default
    .connect("mongodb://localhost:27017/HW20")
    .then(() => {
    console.log("MongoDB connected!");
})
    .catch((err) => {
    console.log(err);
});
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/employee", employee_1.default);
app.get("/test", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.use(globalErrorHandler_js_1.default);
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
