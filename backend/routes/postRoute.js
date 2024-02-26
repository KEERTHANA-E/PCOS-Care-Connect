const express = require("express");
const {getAllPosts,createPost,updatePost,deletePost,getPostdetails, getAllPostsByUser}= require("../controllers/postController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const router=express.Router();

router.route("/post/new").post(isAuthenticatedUser,createPost);
router.route("/post/my").get(isAuthenticatedUser, getAllPostsByUser);
router.route("/post/get-all").get(isAuthenticatedUser, getAllPosts);
router.route("/post/:id").put(isAuthenticatedUser, updatePost).delete(isAuthenticatedUser, deletePost).get(isAuthenticatedUser,getPostdetails);

module.exports=router