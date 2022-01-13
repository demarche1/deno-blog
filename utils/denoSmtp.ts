import { SmtpClient } from "../deps.ts";

const client = new SmtpClient();

await client.connect({
  hostname: "smtp.mailtrap.io",
  port: 2525,
  username: "c780f7fe235a11",
  password: "8780deebad9ba3",
});

export default client;
