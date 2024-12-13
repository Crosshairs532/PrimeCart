import { Router } from "express";
import { shopController } from "./shop.controller";
import { fileUploader } from "../../custom/fileUpload";
import parseData from "../../middleware/parseData";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import parseMultipleData from "../../middleware/parseMultipleData";

const router = Router();

router.get(
  "/all-products",
  auth(userRole.VENDOR),
  shopController.getAllProduct
);

router.post(
  "/create-shop",
  auth(userRole.VENDOR),
  fileUploader.upload.single("file"),
  parseData,
  shopController.createShop
);

router.post(
  "/create-product",
  auth(userRole.VENDOR),
  fileUploader.upload.array("file"),
  parseMultipleData,
  shopController.createProduct
);

router.patch(
  "/manage-shop",
  auth(userRole.VENDOR),
  fileUploader.upload.single("file"),
  parseData,
  shopController.manageShop
);

router.get(
  "/view-order-history",
  auth(userRole.VENDOR),
  shopController.viewOrderHistory
);

router.post(
  "/create-coupon",
  auth(userRole.VENDOR),
  shopController.createCoupon
);
export const shopRoute = router;
