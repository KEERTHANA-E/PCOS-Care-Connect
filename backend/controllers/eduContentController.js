const EduContent = require('../models/eduContentModel.js');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createEduContent = catchAsyncErrors(async (req, res, next) => {
    req.body.postedBy = req.user.id;
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