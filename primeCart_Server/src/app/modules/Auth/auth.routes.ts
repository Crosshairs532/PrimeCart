import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.post("/registration", authController.userCreate);
router.post("/login", authController.userLogin);

export const authRoutes = router;
