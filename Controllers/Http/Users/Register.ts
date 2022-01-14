import { User, UserKeys } from "../../../Models/index.ts";
import storeValidator from "../../../validators/user/register/storeValidator.ts";
import updateValidator from "../../../validators/user/register/updateValidator.ts";
import verifyEmail from "../../../resources/emails/verify-email.ts";
import client from "../../../utils/denoSmtp.ts";
import generateUUID from "../../../utils/uuid.ts";
import createResponse from "../../../utils/createResponse.ts";
import { hashSync } from "../../../deps.ts";
class RegisterController {
  async store(ctx: any) {
    try {
      const { email, redirectUrl } = await storeValidator(ctx);

      const id = await generateUUID(email);

      await User.create({ id, email });

      const key = crypto.randomUUID() + new Date().getTime();

      await UserKeys.create({ key, userId: id });

      const link = `${redirectUrl.replace(/\/$/, "")}/${key}`;

      await client.send({
        from: "contato@denoblog.com",
        to: email,
        subject: "Criação de conta",
        content: verifyEmail({ link }),
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
      const { key, name, password } = await updateValidator(ctx);

      const userKey = await UserKeys.where("key", key).first();

      const user = await User.find(String(userKey.userId));

      user.name = name;
      user.username = name.toLowerCase() + new Date().getTime();
      user.password = hashSync(password);
      await user.update();

      await userKey.delete();

      createResponse(ctx, 200, { user });
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }
}

export default new RegisterController();
