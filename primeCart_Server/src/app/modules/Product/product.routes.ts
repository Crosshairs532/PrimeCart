import { Router } from "express";
import { productController } from "./product.controller";

const router = Router();

router.patch("/", productController.manageProductInventory);

export const productRoutes = router;
