import { generateJwt } from "../../../utils/jwt.ts";
import storeValidator from "../../../validators/auth/storeValidator.ts";
import createResponse from "../../../utils/createResponse.ts";

class AuthController {
  async store(ctx: any) {
    try {
      const user = await storeValidator(ctx);

      const payload = {
        iss: String(user?.email),
        exp: 60 * 60,
      };

      const jwt = await generateJwt(payload);

      ctx.cookies.set("jwt", jwt);

      createResponse(ctx, 200);
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }

  destroy(ctx: any) {
    ctx.cookies.delete("jwt");

    createResponse(ctx, 200);
  }
}

export default new AuthController();
