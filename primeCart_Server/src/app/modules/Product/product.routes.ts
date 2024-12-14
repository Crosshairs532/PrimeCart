import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.patch("/", productController.manageProductInventory);
router.get("/:id", productController.singleProduct);
router.get("/:productId", productController.singleProductReview);

export const productRoutes = router;
