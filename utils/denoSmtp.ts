import { SmtpClient } from "../deps.ts";

export const client = new SmtpClient();

export const connectConfig = {
  hostname: "smtp.mailtrap.io",
  port: 2525,
  username: "c780f7fe235a11",
  password: "8780deebad9ba3",
};
