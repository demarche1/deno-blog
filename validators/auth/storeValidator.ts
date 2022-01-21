import { User } from "../../Models/index.ts";
import { isEmail, isEmpty, compareSync } from "../../deps.ts";

const storeValidator = async (ctx: any) => {
  const { email, password } = await ctx.request.body().value;

  if (isEmpty(email, []) || isEmpty(password, [])) {
    throw new Error("Please provide email and password");
  }

  if (!isEmail(email, [])) {
    throw new Error("Please provide a valid email");
  }

  const user: User = await User.where("email", email).first();

  if (!user) {
    throw new Error("User not found!");
  }

  if (!compareSync(password, String(user.password))) {
    throw new Error("Password incorrect!");
  }

  return user;
};

export default storeValidator;
