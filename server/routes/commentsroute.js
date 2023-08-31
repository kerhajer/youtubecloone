const express=require('express')

const { addComment, deleteComment, getComments ,updatecomm} =require("../controllers/commentcontroller.js");
const {verifyToken} =require ("../middlware/verifyToken.js")
const router = express.Router();

router.post("/", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)
router.put("/update/:id", verifyToken, updatecomm)

router.get("/:videoId", getComments)

module.exports=router