import { Router } from "express";
import { getMe, changeName, changeEmail } from "../controller/user.js";
import authentication from "../middleware/authentication.js";

const router = Router();

router.get("/me", authentication, getMe);
router.post("/change-fullname" , authentication, changeName);
router.post("/change-email", authentication, changeEmail);
// router.put("/update", authentication, updateUserProfile);

export default router;