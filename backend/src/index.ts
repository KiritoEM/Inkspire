import app from "server";
import http from "http";
import { PORT } from "helpers/constants";
import { checkDatabaseConnection } from "./database";

const main = async () => {
  await checkDatabaseConnection();

  const server = http.createServer(app);

  server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

main();

