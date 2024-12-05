import { Router } from "express";
import { fileUploader } from "../../custom/fileUpload";
import parseData from "../../middleware/parseData";
import { userController } from "./user.controller";

const router = Router();

router.post(
  "/registration",
  fileUploader.upload.single("file"),
  parseData,
  userController.userCreate
);
export const userRoutes = router;
