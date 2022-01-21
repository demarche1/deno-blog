import { validate, isString, nullable, isIn } from "../../../deps.ts";
import { unique } from "../../../utils/unique.ts";

const updateValidator = async (ctx: any) => {
  const inputs = await ctx.request.body().value;

  const [passes, errors] = await validate(inputs, {
    name: [isString, nullable],
    username: [isString, nullable, unique("username", inputs.username)],
    email: [isString, nullable, unique("email", inputs.email)],
    password: [isString, nullable, isIn(inputs.confirmedPassword)],
    confirmedPassword: [isString, nullable, isIn(inputs.password)],
  });

  if (!passes) {
    throw new Error(JSON.stringify(errors));
  }

  delete inputs.confirmedPassword;

  return inputs;
};

export default updateValidator;
