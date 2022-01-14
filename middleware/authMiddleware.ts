import { verify } from "../deps.ts";
import { key } from "../utils/jwt.ts";
import { User } from "../Models/index.ts";
import createResponse from "../utils/createResponse.ts";

export const authMiddleware = async (ctx: any, next: Function) => {
  try {
    const jwt = await ctx.cookies.get("jwt");

    if (!jwt) {
      createResponse(ctx, 401, {}, "Unauthorized");
    }

    const data = await verify(jwt, key);

    if (data) {
      const user = await User.where("email", String(data.iss)).first();
      ctx.state.user = user;
      next();
    }
  } catch (_error) {
    createResponse(ctx, 401, {}, "Unauthorized");
  }
};
