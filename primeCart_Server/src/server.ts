import { Server } from "http";
import app from "./app";
import config from "./config";
import path from "path";

const main = () => {
  const port = config.port as string;
  const server: Server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
};

main();