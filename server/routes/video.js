import express from "express";
import { addVideo, addView, getByTag, getVideo, random, search } from "../controllers/video.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)

router.get("/find/:id", getVideo)

router.put("/view/:id", addView)

router.get("/random", random)

router.get("/tags", getByTag)

router.get("/search", search)

export default router;