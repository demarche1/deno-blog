import { verify } from "../deps.ts";
import { key } from "../utils/jwt.ts";
import { User } from "../Models/index.ts";

export const authMiddleware = async (ctx: any, next: Function) => {
  try {
    const jwt = await ctx.cookies.get("jwt");

    if (!jwt) {
      ctx.response.status = 401;
      ctx.response.body = {
        msg: "Unauthorized",
      };
    }

    const data = await verify(jwt, key);

    if (data) {
      const user = await User.where("email", String(data.iss)).first();
      ctx.state.user = user;
      next();
    }
  } catch (_error) {
    ctx.response.status = 400;
    ctx.response.body = {
      msg: "Unauthorized",
    };
  }
};
