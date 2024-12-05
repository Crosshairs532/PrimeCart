import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/login", authController.userLogin);
router.patch("/change-password");
router.post("/forget-password", authController.forgetPassword);
router.post("/reset-password", authController.resetPassword);

export const authRoutes = router;
