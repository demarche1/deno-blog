import { isEmpty, isEmail } from "../../../deps.ts";
import { UserKeys } from "../../../Models/index.ts";

const validate = async (ctx: any) => {
  const { key, name, password, confirmedPassword } = await ctx.request.body()
    .value;

  if (
    isEmpty(key, []) ||
    isEmpty(name, []) ||
    isEmpty(password, []) ||
    isEmpty(confirmedPassword, [])
  ) {
    throw new Error("All fields is required");
  }

  const userKey = await UserKeys.where("key", key).first();

  if (!userKey) {
    throw new Error("Invalid key");
  }

  if (password !== confirmedPassword) {
    throw new Error("Passwords must be equals");
  }

  return { key, name, password };
};

export default validate;
