import { Router } from "express";
import { getRandomCreator } from "../api/public/CreatorInfo.js";

const router = Router();

router.get('/creators/random', getRandomCreator)

export default router;