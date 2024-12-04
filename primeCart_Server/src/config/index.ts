import path from "path";

require("dotenv").config({ path: path.join((process.cwd(), ".env")) });

export const config = {
  port: process.env.PORT,
  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_expireTime: process.env.JWT_EXPIRE_TIME,
  },
};

export default config;
