import { Router } from "express";
import { adminController } from "./admin.controller";
import { categoryController } from "../Category/category.controller";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";

const router = Router();

// need auth validation.
router.patch(
  "/suspend-delete",
  auth(userRole.ADMIN),
  adminController.adminSuspendDelete
);
router.post(
  "/shop-blacklist",
  auth(userRole.ADMIN),
  adminController.adminShopBlackList
);
router.post(
  "/create-category",
  auth(userRole.ADMIN),
  categoryController.createCategory
); //create category
router.patch(
  "/edit-category",
  auth(userRole.ADMIN),
  categoryController.editCategory
); // edit category
router.patch(
  "/delete-category",
  auth(userRole.ADMIN),
  categoryController.deleteCategory
); // edit category
export const adminRoutes = router;
