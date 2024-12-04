import { Router } from "express";
import { authController } from "./auth.controller";
import { fileUploader } from "../../custom/fileUpload";
import parseData from "../../middleware/parseData";

const router = Router();

router.post(
  "/registration",
  fileUploader.upload.single("file"),
  parseData,
  authController.userCreate
);
router.post("/login", authController.userLogin);

export const authRoutes = router;
