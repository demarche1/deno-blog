import { Router } from "../deps.ts";
import SearchController from "../Controllers/Http/Search/Main.ts";
import authMiddlewere from "../middleware/authMiddleware.ts";

const router = new Router();

router.get("/users/search/:keyword", SearchController.index);

export default router;
