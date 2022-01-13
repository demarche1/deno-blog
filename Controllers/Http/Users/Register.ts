import { User, UserKeys } from "../../../Models/index.ts";
import storeValidate from "../../../validates/user/register/storeValidate.ts";
import client from "../../../utils/denoSmtp.ts";
import generateUUID from "../../../utils/uuid.ts";
import verifyEmail from "../../../resources/emails/verify-email.ts";

class RegisterController {
  async store(ctx: any) {
    try {
      const { email, redirectUrl } = await storeValidate(ctx);

      const id = await generateUUID(email);

      await User.create({ id, email });

      const key = crypto.randomUUID() + new Date().getTime();

      await UserKeys.create({ key, userId: id });

      const link = `${redirectUrl.replace(/\/$/, "")}/${key}`;

      await client.send({
        from: "contato@facebook.com",
        to: "alessandro@gmail.com",
        subject: "Criação de conta",
        content: verifyEmail({ link }),
      });

      await client.close();

      ctx.response.status = 200;
      ctx.response.body = {
        msg: "Success!",
      };
    } catch (error) {
      console.log(error.message);
      ctx.response.status = 400;
      ctx.response.body = {
        msg: error.message,
      };
    }
  }
}

export default new RegisterController();
