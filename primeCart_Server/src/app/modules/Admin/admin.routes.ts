import { Router } from "express";
import { adminController } from "./admin.controller";
import { categoryController } from "../Category/category.controller";

const router = Router();

router.patch("/suspend-delete", adminController.adminSuspendDelete);
router.post("/shop-blacklist", adminController.adminShopBlackList);
router.post("/create-category", categoryController.createCategory);
export const adminRoutes = router;
