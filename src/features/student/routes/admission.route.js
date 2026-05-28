import express from "express";

import { createAdmission } from "../controllers/admission.controller.js";
import { authMiddleWare, authorizedRoles } from "../../../middlewares/index.js";

const admissionRouter = express.Router();

admissionRouter.post(
  "/re-admission",
  authMiddleWare,
  authorizedRoles("admin"),
  createAdmission
);

export default admissionRouter;
