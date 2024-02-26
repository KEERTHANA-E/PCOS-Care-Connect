const express = require("express");
const { getAllPosts, createPost, updatePost, deletePost, getPostdetails, getAllPostsByUser, createComment, deleteComment, toggleLikePost }= require("../controllers/postController.js");
const { isAuthenticatedUser } = require("../middleware/auth.js");
const router=express.Router();

router.route("/post/new").post(isAuthenticatedUser,createPost);
router.route("/post/my").get(isAuthenticatedUser, getAllPostsByUser);
router.route("/post/get-all").get(isAuthenticatedUser, getAllPosts);
router.route("/post/:id").put(isAuthenticatedUser, updatePost).delete(isAuthenticatedUser, deletePost).get(isAuthenticatedUser,getPostdetails);
router.route('/post/:postId/comments').post(isAuthenticatedUser, createComment);
router.route('/post/:postId/comments/:commentId').delete(isAuthenticatedUser, deleteComment);
router.route('/post/:postId/like').post(isAuthenticatedUser, toggleLikePost);
module.exports=router