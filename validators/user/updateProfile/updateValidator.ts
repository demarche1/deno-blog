import { isEmail } from "../../../deps.ts";

const validate = async (ctx: any) => {
  const updateData = await ctx.request.body().value;

  if (updateData.email) {
    if (!isEmail(updateData.email, [])) {
      throw new Error("Invalid email");
    }
  }

  if (updateData.password) {
    if (updateData.password !== updateData.confirmedPassword) {
      throw new Error("Passwords must be equals");
    }
  }

  return updateData;
};

export default validate;
