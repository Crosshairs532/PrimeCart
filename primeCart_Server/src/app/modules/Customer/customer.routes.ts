import { Router } from "express";
import { customerController } from "./customer.controller";

const router = Router();
router.post("/review-rating", customerController.giveReviewRating);
export const customerRoutes = router;
