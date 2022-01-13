import { Database, MySQLConnector } from "../deps.ts";

const connector: MySQLConnector = new MySQLConnector({
  database: "deno-blog-database",
  host: "localhost",
  username: "root",
  password: "secret",
  port: 3306,
});

export default new Database(connector);
