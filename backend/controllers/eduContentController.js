const EduContent = require('../models/eduContentModel.js');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createEduContent = catchAsyncErrors(async (req, res, next) => {
    req.body.postedBy = req.user.id;
    req.body.userName = req.user.name;
    const eduContent = await EduContent.create(req.body);
    return res.status(201).json({
        success: true,
        eduContent
    });
});

exports.getAllEduContent = catchAsyncErrors(async (req, res, next) => {
    const eduContentList = await EduContent.find();
    if (eduContentList) {
        return res.status(200).json({
            success: true,
            eduContentList
        });
    }
    return res.status(500).json({
        success: false,
        message: "error"
    })
});

exports.updateEduContent = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found", 404));
    }
    if (eduContent.postedBy !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to update this eduContent", 403));
    }
    eduContent = await EduContent.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    return res.status(200).json({
        success: true,
        eduContent
    });
});

exports.deleteEduContent = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found", 404));
    }
    if (eduContent.postedBy !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to update this eduContent", 403));
    }
    await eduContent.deleteOne(eduContent);

    return res.status(200).json({
        success: true,
        message: "EduContent Delete Successfully",
    });
});
exports.getEduContentDetails = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found", 404));
    }
    return res.status(200).json({
        success: true,
        eduContent
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

    const eduContent = await EduContent.findByIdAndUpdate(req.params.eduContentId, { $push: { comments: comment } }, { new: true });

    return res.status(201).json({
        success: true,
        eduContent
    });
});
// delete comment
exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
    const eduContent = await EduContent.findById(req.params.eduContentId);
    if (!eduContent) {
        return next(new ErrorHandler("eduContent not found", 404));
    }

    const commentIndex = eduContent.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

    if (commentIndex === -1) {
        return next(new ErrorHandler("Comment not found", 404));
    }
    if (eduContent.comments[commentIndex].userId.toString() !== req.user.id) {
        return next(new ErrorHandler("You are not authorized to delete this comment", 403));
    }
    eduContent.comments.splice(commentIndex, 1);
    await eduContent.save(); // Save the eduContent if validation succeeds
    return res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});
// toggle like button
exports.toggleLikeEduContent = catchAsyncErrors(async (req, res, next) => {
    const eduContentId = req.params.eduContentId;
    const userId = req.user.id;
    console.log(req.user);
    const eduContent = await EduContent.findById(eduContentId);
    if (!eduContent) {
        return next(new ErrorHandler("eduContent not found", 404));
    }

    const index = eduContent.likes.indexOf(userId);
    if (index === -1) {
        // User has not liked the eduContent, so add like
        eduContent.likes.push(userId);
        await eduContent.save();
        req.user.favList.push(eduContentId);
        await req.user.save();
        return res.status(200).json({ success: true, message: 'eduContent liked successfully', eduContent: eduContent });
    } else {
        // User has already liked the eduContent, so remove like
        eduContent.likes.splice(index, 1);
        await eduContent.save();
        req.user.favList.pull(eduContentId);
        await req.user.save();
        return res.status(200).json({ success: true, message: 'eduContent like removed successfully', eduContent: eduContent });
    }
});