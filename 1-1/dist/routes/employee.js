"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = __importDefault(require("../controllers/employee"));
const express_1 = __importDefault(require("express"));
const async_js_1 = __importDefault(require("../middlewares/async.js"));
const getEmployee_1 = __importDefault(require("../middlewares/getEmployee"));
const queryCheker_1 = __importDefault(require("../middlewares/queryCheker"));
const router = express_1.default.Router();
router.param("employeeNationalCode", getEmployee_1.default);
router.get("/", queryCheker_1.default, (0, async_js_1.default)(employee_1.default.getAllEmployees));
router.get("/:employeeNationalCode", (0, async_js_1.default)(employee_1.default.getEmployeeByNationalCode));
router.post("/", (0, async_js_1.default)(employee_1.default.createEmployee));
router.put("/:employeeNationalCode", (0, async_js_1.default)(employee_1.default.updateEmployee));
router.delete("/:employeeNationalCode", (0, async_js_1.default)(employee_1.default.deleteEmployee));
exports.default = router;
