const EduContent = require('../models/eduContentModel.js');
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

exports.createEduContent = catchAsyncErrors(async (req, res, next) => {
    const eduContent = await EduContent.create(req.body);
    res.status(201).json({
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
        success:false,
        message:"error"
    })
});

exports.updateEduContent = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found",404));
    }
    eduContent = await EduContent.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        eduContent
    });
});

exports.deleteEduContent = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found",404));
    }

    await eduContent.deleteOne(eduContent);

    res.status(200).json({
        success: true,
        message: "EduContent Delete Successfully",
    });
});
exports.getEduContentDetails = catchAsyncErrors(async (req, res, next) => {
    let eduContent = await EduContent.findById(req.params.id);
    if (!eduContent) {
        return next(new ErrorHandler("EduContent not found",404));
    }
    res.status(200).json({
        success: true,
        eduContent
    });
});