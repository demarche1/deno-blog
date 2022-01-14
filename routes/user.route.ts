import { Router } from "../deps.ts";
import RegisterController from "../Controllers/Http/Users/Register.ts";

const router = new Router();

router.post("/user/register", RegisterController.store);
router.get("/user/register/:key", RegisterController.show);
router.put("/user/register", RegisterController.update);

export default router;
