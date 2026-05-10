import { Router } from "express";

import { register } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { authMiddleWare } from "../../../middlewares/auth.middleware.js";
import { authorizedRoles } from "../../../middlewares/role.middleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleWare, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

router.get(
  "/admin-dashboard",
  authMiddleWare,
  authorizedRoles("admin"),
  (req, res) => {
    res.json({ message: "welcome admin!!", user: req.user });
  }
);

export default router;
