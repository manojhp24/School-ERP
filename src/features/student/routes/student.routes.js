import express from "express";

import {
  studentAdmission,
  getAllStudents,
  deleteStudent,
  restoreStudent,
  updateStudent,
  getStudentProfileById,
} from "../controllers/student.controller.js";
import { authMiddleWare } from "../../../middlewares/auth.middleware.js";
import { authorizedRoles } from "../../../middlewares/role.middleware.js";
import { upload } from "../../../middlewares/upload.middleware.js";

const studentRouter = express.Router();

studentRouter.post(
  "/student-admission",
  authMiddleWare,
  authorizedRoles("admin"),
  upload.single("studentImage"),
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
  authorizedRoles("admin", "parent"),
  getStudentProfileById
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
