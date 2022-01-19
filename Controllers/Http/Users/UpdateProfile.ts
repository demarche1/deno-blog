import createResponse from "../../../utils/createResponse.ts";
import updateValidator from "../../../validators/user/updateProfile/updateValidator.ts";
import { hashSync } from "../../../deps.ts";
import { User } from "../../../Models/index.ts";

class UpdateController {
  show(ctx: any) {
    const user = ctx.state.user;
    createResponse(ctx, 200, { user });
  }

  async update(ctx: any) {
    try {
      const user = await User.where("id", ctx.state.user.id).first();

      const updateData = await updateValidator(ctx);

      user.email = updateData.email ? updateData.email : user.email;
      user.name = updateData.name ? updateData.name : user.name;
      user.username = updateData.username ? updateData.username : user.username;
      user.password = updateData.password
        ? hashSync(updateData.password)
        : user.password;

      await user.update();

      ctx.state.user = user;

      createResponse(ctx, 200);
    } catch (error) {
      createResponse(ctx, 400, {}, error.message);
    }
  }
}

export default new UpdateController();
