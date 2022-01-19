import { Router } from "../deps.ts";
import RegisterController from "../Controllers/Http/Users/Register.ts";
import ForgotPasswordController from "../Controllers/Http/Users/ForgotPassword.ts";
import UpdateController from "../Controllers/Http/Users/UpdateProfile.ts";
import authMiddleware from "../middleware/authMiddleware.ts";

const router = new Router();

router.post("/user/register", RegisterController.store);
router.get("/user/register/:key", RegisterController.show);
router.put("/user/register", RegisterController.update);

router.post("/user/forgot-password", ForgotPasswordController.store);
router.get("/user/forgot-password/:key", ForgotPasswordController.show);
router.put("/user/forgot-password", ForgotPasswordController.update);

router.get("/user/profile", authMiddleware, UpdateController.show);
router.put("/user/profile", authMiddleware, UpdateController.update);

export default router;
