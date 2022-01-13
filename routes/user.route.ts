import { Router } from "../deps.ts";
import RegisterController from "../Controllers/Http/Users/Register.ts";

const router = new Router();

router.post("/user/register", RegisterController.store);

export default router;
