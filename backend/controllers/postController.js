const Post = require('../models/postModel.js');
const ErrorHandler = require('../utils/errorhandler.js');
const catchAsyncErrors = require("../middleware/catchAsyncErrors.js");
const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "chintu-16",
    api_key: "218731319667714",
    api_secret: "pvEoMr5tBuitLZ4VDZv6nvsuiSg",
    secure: true
})

exports.createPost = catchAsyncErrors(async (req, res, next) => {
    req.body.postedBy = req.user.id;
    req.body.userName = req.user.name;
    const post = await Post.create(req.body);
    console.log("before post");
    const { file } = req;
    console.log(file);
    if (file) {
        const { secure_url, public_id } = await cloudinary.uploader.upload(file.path)
        post.images = { url: secure_url, public_id };
        console.log("file");
    }
    await post.save();
    return res.status(201).json({
        success: true,
        post
    });
});

exports.getAllPosts = catchAsyncErrors(async (req, res) => {
    const posts = await Post.find();
    // const postsWithUrls = posts.map(post => ({
    //     ...post.toObject(),
    //     images: post.images.map(image => image.url)
    // }));
    // console.log(postsWithUrls);
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
    console.log(typeof post.postedBy + "-----" +typeof req.user.id)
    if (post.postedBy.toString() !== req.user.id) {
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
    if (post.postedBy.toString() !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to delete this post", 403));
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
// add comment
exports.createComment = catchAsyncErrors(async (req, res, next) => {
    const { text } = req.body;
    const comment = {
        text,
        userId: req.user.id,
        userName: req.user.name,
        createdAt: new Date()
    };

    const post = await Post.findByIdAndUpdate(req.params.postId, { $push: { comments: comment } }, { new: true });

    return res.status(201).json({
        success: true,
        post
    });
});
// delete comment
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const post = await Post.findById(req.params.postId);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    const commentIndex = post.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

    if (commentIndex === -1) {
        return next(new ErrorHandler("Comment not found", 404));
    }
    // console.log(typeof post.comments[commentIndex].userId + "----" + typeof req.user.id);
    // // Check if the user is authorized to delete the comment
    if (post.comments[commentIndex].userId.toString() !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to delete this comment", 403));
    }

    post.comments.splice(commentIndex, 1);
    await post.save(); // Save the post if validation succeeds
    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});

exports.toggleLikePost = catchAsyncErrors(async (req, res, next) => {
    const postId = req.params.postId;
    const userId = req.user.id;
    console.log(req.user);
    const post = await Post.findById(postId);
    if (!post) {
        return next(new ErrorHandler("Post not found", 404));
    }

    const index = post.likes.indexOf(userId);
    if (index === -1) {
        // User has not liked the post, so add like
        post.likes.push(userId);
        await post.save();
        req.user.favList.push(postId);
        await req.user.save();
        return res.status(200).json({ success: true, message: 'Post liked successfully',post : post });
    } else {
        // User has already liked the post, so remove like
        post.likes.splice(index, 1);
        await post.save();
        req.user.favList.pull(postId);
        await req.user.save();
        return res.status(200).json({ success: true, message: 'Post like removed successfully', post: post });
    }
});