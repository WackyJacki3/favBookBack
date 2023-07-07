import { Router } from "express";
import { register, login, changePassword } from '../controller/auth.js';
import authentication from "../middleware/authentication.js"


const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/change-password", authentication, changePassword);
// router.post("/logout", logout);

export default router;