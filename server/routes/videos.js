const express=require("express");
const { addVideo, deleteVideo,addView, getByTag, getVideo, random, search, sub, trend }=require ("../controllers/videocontroller.js");
const { verifyToken } =require("../middlware/verifyToken.js");

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, deleteVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", sub)
router.get("/tags", getByTag)
router.get("/search", search)

module.exports=router