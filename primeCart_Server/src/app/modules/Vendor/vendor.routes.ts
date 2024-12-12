import { Router } from "express";
import { vendorController } from "./vendor.controller";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";

const router = Router();

router.post(
  "/view-all-reviews",
  auth(userRole.VENDOR),
  vendorController.productReview
);

export const userRoutes = router;
