const express = require("express");
const {getAllPosts,createPost,updatePost,deletePost,getPostdetails}= require("../controllers/postController.js");
const router=express.Router();

router.route("/post/new").post(createPost);
router.route("/post/get-all").get(getAllPosts);
router.route("/post/:id").put(updatePost).delete(deletePost).get(getPostdetails);

module.exports=router