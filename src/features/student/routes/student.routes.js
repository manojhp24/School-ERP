import express from "express";

import {
  studentAdmission,
  getAllStudents,
  deleteStudent,
  restoreStudent,
  updateStudent,
} from "../controllers/student.controller.js";
import { authMiddleWare } from "../../../middlewares/auth.middleware.js";
import { authorizedRoles } from "../../../middlewares/role.middleware.js";

const studentRouter = express.Router();

studentRouter.post(
  "/student-admission",
  authMiddleWare,
  authorizedRoles("admin"),
  studentAdmission
);

studentRouter.get(
  "/",
  authMiddleWare,
  authorizedRoles("admin", "parent"),
  getAllStudents
);

studentRouter.patch(
  "/:studentId",
  authMiddleWare,
  authorizedRoles("admin"),
  updateStudent
);

studentRouter.delete(
  "/:studentId",
  authMiddleWare,
  authorizedRoles("admin"),
  deleteStudent
);

studentRouter.patch(
  "/restore/:studentId",
  authMiddleWare,
  authorizedRoles("admin"),
  restoreStudent
);

export default studentRouter;
