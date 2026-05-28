import { Router } from "express";
import { ApiResponse } from "../utils/ApiResponse.js";
import authRoutes from "../features/auth/routes/auth.routes.js";
import { studentRoutes, admissionRoutes } from "../features/student/index.js";

const router = Router();

router.get("/health-check", (req, res) => {
  return res
    .status(200)
    .json(
      new ApiResponse(200, { status: "OK" }, "Server is healthy and reachable")
    );
});

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/admissions", admissionRoutes);

export default router;
