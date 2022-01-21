import { isEmpty } from "../../../deps.ts";
import { User, UserKeys } from "../../../Models/index.ts";

const updateValidator = async (ctx: any) => {
  const { key, password, confirmedPassword } = await ctx.request.body().value;

  if (isEmpty(key, [])) {
    throw new Error("Key not be empty");
  }

  if (isEmpty(password, []) || isEmpty(confirmedPassword, [])) {
    throw new Error("All fields is required");
  }

  if (password !== confirmedPassword) {
    throw new Error("Passwords must be equals");
  }

  const user = await UserKeys.where(UserKeys.field("key"), key)
    .join(User, User.field("id"), UserKeys.field("user_id"))
    .get();

  if (!user) {
    throw new Error("Invalid key");
  }

  return { key, password };
};

export default updateValidator;
