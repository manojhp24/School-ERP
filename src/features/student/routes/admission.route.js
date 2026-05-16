import express from "express";

import { createAdmission } from "../controllers/admission.controller.js";
import { authMiddleWare } from "../../../middlewares/auth.middleware.js";
import { authorizedRoles } from "../../../middlewares/role.middleware.js";

const admissionRouter = express.Router();

admissionRouter.post(
  "/re-admission",
  authMiddleWare,
  authorizedRoles("admin"),
  createAdmission
);

export default admissionRouter;
