import { Router } from "../deps.ts";
import AuthController from "../Controllers/Http/Auth/Main.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = new Router();

router.post("/auth", AuthController.store);
router.delete("/auth", authMiddleware, AuthController.destroy);

export default router;
