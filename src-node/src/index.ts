/// <reference path="../@types/express/index.d.ts" />

import app from "server";
import http from "http";
import { PORT } from "helpers/constants";
import { checkDatabaseConnection } from "./database";
import { config } from "dotenv";

const main = async () => {
  await checkDatabaseConnection();
  config();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    (`Server is running at http://localhost:${PORT}`);
  });
}

main();

