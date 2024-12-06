import { NextFunction, Request, Response } from "express";
import CatchAsync from "../utility/CatchAsync";
import { fileUploader } from "../custom/fileUpload";

const parseMultipleData = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = JSON.parse(req.body.data);
    const files = req?.files;
    // console.log(files, "images");

    const uploadedImages: string[] = [];

    if (files) {
      const images = await Promise.all(
        files?.map(async (file: any) => {
          const result = (await fileUploader.uploadImage(file)) as any;
          const profilePhoto = result.secure_url;
          return profilePhoto;
        })
      );
      uploadedImages.push(...images);
    }

    req.body = { ...userData, images: uploadedImages };

    // console.log({ ...userData, images: uploadedImages });
    next();
  }
);

export default parseMultipleData;
