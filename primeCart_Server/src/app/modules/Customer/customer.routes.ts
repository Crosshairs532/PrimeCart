import { Router } from "express";
import { customerController } from "./customer.controller";

const router = Router();
router.post("/review-rating", customerController.giveReviewRating);
router.post("/order", customerController.orderProduct);
router.get("/browse-products", customerController.browseProduct);

export const customerRoutes = router;
