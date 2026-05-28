import express from "express";

import {
  studentAdmission,
  getAllStudents,
  deleteStudent,
  restoreStudent,
  updateStudent,
  getStudentProfile,
} from "../controllers/index.js";
import { authMiddleWare, authorizedRoles } from "../../../middlewares/index.js";

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

studentRouter.get(
  "/:studentId",
  authMiddleWare,
  authorizedRoles("admin"),
  getStudentProfile
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
