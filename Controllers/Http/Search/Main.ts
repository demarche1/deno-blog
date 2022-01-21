import { User } from "../../../Models/index.ts";
import createResponse from "../../../utils/createResponse.ts";

class SearchController {
  async index(ctx: any) {
    const keyword = await ctx.params.keyword;
    console.log(keyword);

    const response = await User.where("name", "like", keyword).all();

    console.log(response);

    createResponse(ctx, 200, { response });
  }
}

export default new SearchController();
