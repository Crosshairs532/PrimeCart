import { Router } from "express";
import { shopController } from "./shop.controller";
import { fileUploader } from "../../custom/fileUpload";
import parseData from "../../middleware/parseData";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import parseMultipleData from "../../middleware/parseMultipleData";

const router = Router();

router.get(
  "/vendor-all-products",
  // auth(userRole.VENDOR),
  shopController.getAllProduct
); // vendor specific products.

router.post(
  "/create-shop",
  // auth(userRole.VENDOR),
  fileUploader.upload.single("file"),
  parseData,
  shopController.createShop
);

router.post(
  "/create-product",
  // auth(userRole.VENDOR),
  fileUploader.upload.array("file"),
  parseMultipleData,
  shopController.createProduct
);

router.patch(
  "/manage-shop",
  // auth(userRole.VENDOR),
  fileUploader.upload.single("file"),
  parseData,
  shopController.manageShop
);

router.get(
  "/view-order-history",
  auth(userRole.VENDOR),
  shopController.viewOrderHistory
); // this is for vendor. they can see the orders that have been made.

router.post(
  "/create-coupon",
  auth(userRole.VENDOR),
  shopController.createCoupon
);

router.get("/:shopId", shopController.singleShopInfo);

router.post(
  "/view-all-reviews",
  auth(userRole.VENDOR),
  shopController.productReview
);

router.post("/flash-sale", auth(userRole.VENDOR), shopController.flashSale);

export const shopRoute = router;
