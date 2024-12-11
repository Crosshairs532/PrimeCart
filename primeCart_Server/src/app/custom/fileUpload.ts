import multer from "multer";
import config from "../../config";
import fs from "fs";
import path from "path";
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.cloud_key,
  api_secret: config.cloudinary.cloud_secret,
});

// Upload an image
const uploadImage = async (file: any) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file?.path,
      // {
      //   public_id: file.originalname,
      // },
      (error: Error, result: any) => {
        fs.unlinkSync(file?.path);
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.resolve(process.cwd(), "uploads");
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

export const fileUploader = {
  upload,
  uploadImage,
};
