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
    images: 
        {
            type: Object,
            url: String,
            public_id: String
        },
    likes: [
        { 
            type: mongoose.Schema.ObjectId, 
            ref: "User" 
        }
    ],
    comments: [
        {
            text: { type: String, required: true },
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            userName: { type: String, required: true },
            createdAt: { type: Date, default: Date.now }
        }
    ],
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    userName:{
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Post", postSchema);