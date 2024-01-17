const express = require("express");
const {getAllPosts,createPost,updatePost,deletePost}= require("../controllers/postController.js");
const router=express.Router();

router.route("/post/new").post(createPost);
router.route("/post/get-all").get(getAllPosts);
router.route("/post/:id").put(updatePost);
router.route("/post/:id").delete(deletePost);

module.exports=router