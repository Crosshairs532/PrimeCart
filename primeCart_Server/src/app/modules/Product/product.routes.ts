import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.post("/review-rating", productController.giveReviewRating);
export const productRoutes = router;
