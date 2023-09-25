import express from "express";
import {adminLogin, BlockVideo, UnblockVideo, UserDetails, VideoDetails,UnblockUser,BlockUser } from "../controllers/adminController.js";
import { verifyAdminToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post('/login',adminLogin)

router.get('/users', verifyAdminToken, UserDetails)

router.get('/videos', verifyAdminToken, VideoDetails)

router.put('/videos/:videoId/block', verifyAdminToken, BlockVideo)

router.put('/videos/:videoId/unblock', verifyAdminToken, UnblockVideo)

router.put('/users/:userId/unblockUser',verifyAdminToken, UnblockUser )

router.put('/users/:userId/blockUser',verifyAdminToken, BlockUser )

export default router;

