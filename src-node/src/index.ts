/// <reference path="../@types/express/index.d.ts" />
/// <reference path="../@types/socket.io/index.d.ts" />

import app from "server";
import http from "http";
import { PORT } from "helpers/constants";
import { checkDatabaseConnection } from "./database";
import { config } from "dotenv";
import socket from "./socket";

const main = async () => {
  await checkDatabaseConnection();
  config();

  const server = http.createServer(app);
  socket(server); //initialise socket.io

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();

