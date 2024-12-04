import path from "path";

require("dotenv").config({ path: path.join((process.cwd(), ".env")) });

export const config = {
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expireTime: process.env.JWT_EXPIRE_TIME,
  },
  cloudinary: {
    cloud_secret: process.env.CLOUDINARY_SECRET,
    cloud_key: process.env.CLOUDINARY_KEY,
    cloud_name: process.env.CLOUDINARY_NAME,
  },
};

export default config;