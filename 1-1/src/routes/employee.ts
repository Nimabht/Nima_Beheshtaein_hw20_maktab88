import controllers from "../controllers/employee";
import express, { Router } from "express";
import asyncMiddleware from "../middlewares/async.js";
import getEmployeeByNationalCode from "../middlewares/getEmployee";
import queryChecker from "../middlewares/queryCheker";
const router: Router = express.Router();

router.param("employeeNationalCode", getEmployeeByNationalCode);
router.get("/", queryChecker, asyncMiddleware(controllers.getAllEmployees));
router.get(
  "/:employeeNationalCode",
  asyncMiddleware(controllers.getEmployeeByNationalCode)
);
router.post("/", asyncMiddleware(controllers.createEmployee));
router.put(
  "/:employeeNationalCode",
  asyncMiddleware(controllers.updateEmployee)
);
router.delete(
  "/:employeeNationalCode",
  asyncMiddleware(controllers.deleteEmployee)
);
export default router;
