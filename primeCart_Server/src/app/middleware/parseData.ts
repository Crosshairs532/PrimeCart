import { NextFunction, Request, Response } from "express";
import CatchAsync from "../utility/CatchAsync";
import { fileUploader } from "../custom/fileUpload";

const parseData = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userData = JSON.parse(req.body.data);
    const file = req.file;

    // console.log(file, "hello word");
    let profilePhoto;
    if (file) {
      const result = (await fileUploader.uploadImage(file)) as any;
      profilePhoto = result.secure_url;
    }
    req.body = { ...userData, profilePhoto };

    next();
  }
);

export default parseData;
