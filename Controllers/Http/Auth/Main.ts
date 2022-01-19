import { generateJwt } from "../../../utils/jwt.ts";
import storeValidator from "../../../validators/auth/storeValidator.ts";
import jwtValidator from "../../../validators/auth/jwtValidator.ts";
import createResponse from "../../../utils/createResponse.ts";
import { ApiToken } from "../../../Models/index.ts";

class AuthController {
  async store(ctx: any) {
    try {
      const user = await storeValidator(ctx);

      const payload = {
        iss: String(user?.email),
        exp: 60 * 60,
      };

      const jwt = await generateJwt(payload);

      await ApiToken.create({
        jwt,
        userId: String(user.id),
      });

      createResponse(ctx, 200);
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }

  async destroy(ctx: any) {
    try {
      const jwt = await jwtValidator(ctx);

      const apiToken = await ApiToken.where("jwt", String(jwt)).first();

      await apiToken.delete();

      createResponse(ctx, 200);
    } catch (error) {
      createResponse(ctx, 404, {}, error.message);
    }
  }
}

export default new AuthController();
