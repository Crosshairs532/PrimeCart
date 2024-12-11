import { Router } from "express";
import { adminController } from "./admin.controller";
import { categoryController } from "../Category/category.controller";

const router = Router();

router.patch("/suspend-delete", adminController.adminSuspendDelete);
router.post("/shop-blacklist", adminController.adminShopBlackList);
router.post("/create-category", categoryController.createCategory); //create category
router.patch("/edit-category", categoryController.editCategory); // edit category
router.patch("/delete-category", categoryController.deleteCategory); // edit category
export const adminRoutes = router;
