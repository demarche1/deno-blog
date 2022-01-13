import { isEmpty, isEmail } from "../../../deps.ts";

const validate = async (ctx: any) => {
  const { email, redirectUrl } = await ctx.request.body().value;

  if (isEmpty(email, []) || isEmpty(redirectUrl, [])) {
    throw new Error("All fields is required");
  }

  if (!isEmail(email, [])) {
    throw new Error("invalid email");
  }

  return { email, redirectUrl };
};

export default validate;
