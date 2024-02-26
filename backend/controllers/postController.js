const Post = require('../models/postModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    req.body.postedBy = req.user.id;
    req.body.userName = req.user.name;
    const post = await Post.create(req.body);
    return res.status(201).json({
        success: true,
        post
    });
});

exports.getAllPosts = catchAsyncErrors(async (req, res) => {
    const posts = await Post.find();
    return res.status(200).json({
        success: true,
        posts
    });
});
exports.getAllPostsByUser = catchAsyncErrors(async (req, res) => {
    console.log(req.user.id);
    const posts = await Post.find({ postedBy: req.user.id });
    // filter the posts which are postedBy req.user.id
    return res.status(200).json({
        success: true,
        posts
    });
});

exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }
    if (post.postedBy !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to update this post", 403));
    }
    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(200).json({
        success: true,
        post
    });
});

exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }
    if (post.postedBy !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to update this post", 403));
    }
    await post.deleteOne(post);
    return res.status(200).json({
        success: true,
        message: "Post Delete Successfully",
    });
});
exports.getPostdetails = catchAsyncErrors(async (req, res, next) => {
    let post = await Post.findById(req.params.id);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }
    return res.status(200).json({
        success: true,
        post
    });
});