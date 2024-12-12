import { Router } from "express";
import { vendorController } from "./vendor.controller";

const router = Router();

router.post("/view-all-reviews", vendorController.productReview);

export const userRoutes = router;
