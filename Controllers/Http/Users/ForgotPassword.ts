import { User, UserKeys } from "../../../Models/index.ts";
import storeValidator from "../../../validators/user/forgotPassword/storeValidator.ts";
import updateValidator from "../../../validators/user/forgotPassword/updateValidator.ts";
import renderForgotPasswordEmail from "../../../resources/emails/forgot-password.ts";
import { connectConfig, client } from "../../../utils/denoSmtp.ts";
import createResponse from "../../../utils/createResponse.ts";
import { hashSync } from "../../../deps.ts";

class ForgotPasswordController {
  async store(ctx: any) {
    try {
      const { email, redirectUrl } = await storeValidator(ctx);

      const user = await User.where("email", email).first();

      const key = crypto.randomUUID() + new Date().getTime();

      await UserKeys.create({ key, userId: String(user.id) });

      const link = `${redirectUrl.replace(/\/$/, "")}/${key}`;

      await client.connect(connectConfig);

      await client.send({
        from: "contato@denoblog.com",
        to: email,
        subject: "Recuperação de senha",
        content: renderForgotPasswordEmail({ link, name: String(user.name) }),
      });

      await client.close();

      createResponse(ctx, 200);
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }

  async show(ctx: any) {
    try {
      const userKey = await UserKeys.where("key", ctx.params.key).first();

      const user = await User.find(String(userKey.userId));

      createResponse(ctx, 200, { user });
    } catch (_error) {
      createResponse(ctx, 500, {}, "Internal Error");
    }
  }

  async update(ctx: any) {
    try {
      const { key, password } = await updateValidator(ctx);

      const userKey = await UserKeys.where("key", key).first();

      const user = await User.find(String(userKey.userId));

      user.password = hashSync(password);
      await user.update();

      await userKey.delete();

      createResponse(ctx, 200, { user });
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }
}

export default new ForgotPasswordController();
