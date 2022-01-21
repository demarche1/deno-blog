import { isEmpty, isJWT } from "../../deps.ts";
import { ApiToken } from "../../Models/index.ts";

const jwtValidator = async (ctx: any) => {
  const jwt = await ctx.request.headers.get("authorization");

  if (isEmpty(jwt, [])) {
    throw new Error("Unauthorized");
  }

  if (!isJWT(jwt)) {
    throw new Error("Invalid JWT");
  }

  const hasToken = await ApiToken.where("jwt", jwt).first();

  if (!hasToken) {
    throw new Error("Invalid JWT");
  }

  return jwt;
};

export default jwtValidator;
