import { verify } from "../deps.ts";
import { key } from "../utils/jwt.ts";
import { User } from "../Models/index.ts";
import createResponse from "../utils/createResponse.ts";
import jwtValidator from "../validators/jwt/jwtValidator.ts";

const authMiddleware = async (ctx: any, next: Function) => {
  try {
    const jwt = await jwtValidator(ctx);

    const data = await verify(jwt, key);

    if (data) {
      const user = await User.where("email", String(data.iss)).first();
      ctx.state.user = user;
      await next();
    }
  } catch (error) {
    createResponse(ctx, 401, {}, error.message);
  }
};

export default authMiddleware;
