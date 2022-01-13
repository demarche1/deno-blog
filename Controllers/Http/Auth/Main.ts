// deno-lint-ignore-file no-explicit-any
import { generateJwt } from "../../../utils/jwt.ts";
import storeValidate from "../../../validates/auth/storeValidate.ts";

class AuthController {
  async store(ctx: any) {
    try {
      const user = await storeValidate(ctx);

      const payload = {
        iss: String(user?.email),
        exp: 60 * 60,
      };

      const jwt = await generateJwt(payload);

      ctx.cookies.set("jwt", jwt);

      ctx.response.status = 200;
      ctx.response.body = {
        msg: "Success!",
      };
    } catch (error) {
      console.error(error.message);
      ctx.response.status = 400;
      ctx.response.body = {
        msg: error.message,
      };
    }
  }

  destroy(ctx: any) {
    ctx.cookies.delete("jwt");

    ctx.response.status = 200;
    ctx.response.body = {
      msg: "Success!",
    };
  }
}

export default new AuthController();
