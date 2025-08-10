import { Router } from "express";
const router = Router();
import registerUser from "../api/auth/Register.js";
import loginUser from "../api/auth/Login.js";
import { parse, validate } from "../middleware/UploadMiddleware.js";

router.post("/register", validate, registerUser);
router.post("/login", validate, loginUser);

export default router;