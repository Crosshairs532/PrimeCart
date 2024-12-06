import { Router } from "express";
import { shopController } from "./shop.controller";
import { fileUploader } from "../../custom/fileUpload";
import parseData from "../../middleware/parseData";
import auth from "../../middleware/auth";
import { userRole } from "@prisma/client";
import parseMultipleData from "../../middleware/parseMultipleData";

const router = Router();

router.post(
  "/create-shop",
  auth(userRole.VENDOR),
  fileUploader.upload.single("file"),
  parseData,
  shopController.createShop
);

router.post(
  "/create-product",
  fileUploader.upload.array("file"),
  parseMultipleData,
  shopController.createProduct
);

export const shopRoute = router;
