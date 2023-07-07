import { Router } from "express";
import { addFavBook, getFavBooks, deleteFavBook } from "../controller/book.js";
import authentication from "../middleware/authentication.js";


const router = Router();

router.get("/getFavBooks", authentication, getFavBooks);
router.post("/addFavBook", authentication, addFavBook);
router.post("/deleteFavBook", authentication, deleteFavBook);

export default router;
