const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter post title"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Please Enter post content"],
    },
    images: [
        // how to store images in mongodb
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],
    // likes: [
    //     { 
    //         type: mongoose.Schema.ObjectId, 
    //         ref: "User" 
    //     }
    // ],
    comments: [
        {
            // user: {
            //     type: mongoose.Schema.ObjectId,
            //     ref: "User",
            //     required: true,
            // },
            comment: {
                type: String,
                required: true,
            },
        },
    ],
    // postedBy: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);