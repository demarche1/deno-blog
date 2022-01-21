import { isEmpty, isEmail } from "../../../deps.ts";
import { User } from "../../../Models/index.ts";

const storeValidator = async (ctx: any) => {
  const { email, redirectUrl } = await ctx.request.body().value;

  if (isEmpty(email, []) || isEmpty(redirectUrl, [])) {
    throw new Error("All fields is required");
  }

  if (!isEmail(email, [])) {
    throw new Error("Invalid email");
  }

  const user = await User.where("email", email).first();

  if (!user) {
    throw new Error("Invalid email");
  }

  return { email, redirectUrl };
};

export default storeValidator;
