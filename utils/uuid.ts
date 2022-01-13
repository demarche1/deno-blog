import { v5 } from "../deps.ts";

const generateUUID = async (payload: string) => {
  const data = new TextEncoder().encode(payload);
  const uuid = crypto.randomUUID();

  return (await v5.generate(uuid, data)) + new Date().getTime();
};

export default generateUUID;
