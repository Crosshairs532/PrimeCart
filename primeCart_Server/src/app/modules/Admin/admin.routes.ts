import { Router } from "express";
import { adminController } from "./admin.controller";

const router = Router();

router.patch("/suspend-delete", adminController.adminSuspendDelete);

export const adminRoutes = router;