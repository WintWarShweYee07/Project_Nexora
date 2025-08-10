import { Router } from "express";
import upload from "../middleware/UploadMiddleware.js";
import authMiddleware from "../middleware/AuthMiddleware.js";
import { getDashboardData, getSubscriptions, getSubscribers, updateDashboardData, upgradeToCreator, getBookMarks} from "../api/private/Dashboard.js";
import { retryStripeOnboarding, getStripeDashboardLink } from "../api/util/StripeHandler.js";
import { uploadToCloudinary } from "../api/util/CloudinaryUpload.js";
import { subscribeToCreator } from "../api/private/Subscribing.js";
import { createPost, deletePost, editPost, getAllPosts, likePost } from "../api/private/Posting.js";


const router = Router();

router.get("/creator/subscribed", authMiddleware, getSubscriptions);
router.get("/subscriber", authMiddleware, getSubscribers);
router.get("/bookmarks", authMiddleware, getBookMarks);
router.get("/dashboard", authMiddleware, getDashboardData);
router.patch("/dashboard", authMiddleware, upload.single('profilePic'), uploadToCloudinary, updateDashboardData);
router.patch("/upgrade", authMiddleware, upgradeToCreator);
router.get("/stripe/onboarding", authMiddleware, retryStripeOnboarding);
router.get("/stripe/dashboard", authMiddleware, getStripeDashboardLink);
router.post("/subscribe/:creatorId", authMiddleware, subscribeToCreator );
router.post("/post",authMiddleware,upload.array('attachments',3), uploadToCloudinary, createPost);
router.get("/post",authMiddleware, getAllPosts);
router.get("/post/:creatorId",authMiddleware, getAllPosts);
router.patch("/post/:postId", authMiddleware, upload.array('attachments',3), uploadToCloudinary, editPost);
router.delete("/post/:postId", authMiddleware, deletePost);
router.post("/post/:postId/like", authMiddleware, likePost);


export default router;
