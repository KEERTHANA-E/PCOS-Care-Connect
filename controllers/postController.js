const Post = require('../models/postModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
exports.createPost = catchAsyncErrors(async (req,res,next)=>{
    const post = await Post.create(req.body);
    return res.status(201).json({
        success:true,
        post
    });
});

exports.getAllPosts = catchAsyncErrors(async (req,res) =>{
    const posts = await Post.find();
    return res.status(200).json({
        success:true,
        posts
    });
});

exports.updatePost = catchAsyncErrors(async (req,res,next) =>{
    let post = await Post.findById(req.params.id);
    if(!post){
        return next(new ErrorHandler("Post not found",404));
    }
    post = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    return res.status(200).json({
        success:true,
        post
    });
});

exports.deletePost = catchAsyncErrors(async (req,res,next) =>{
    let post = await Post.findById(req.params.id);
    if(!post){
       return next(new ErrorHandler("Post not found",404));
    }
    await post.deleteOne(post);
    return res.status(200).json({
        success:true,
        message: "Post Delete Successfully",
    });
});
exports.getPostdetails = catchAsyncErrors(async (req,res,next) =>{
    let post = await Post.findById(req.params.id);
    if(!post){
        return next(new ErrorHandler("Post not found",404));
    }
    return res.status(200).json({
        success:true,
        post
    });
});