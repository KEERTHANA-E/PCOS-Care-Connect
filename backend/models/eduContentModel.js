const mongoose = require("mongoose");

const eduContentSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter eduContent title"],
        trim: true,
    },
    content: {
        type: String,
        required: [true, "Please Enter eduContent content"],
    },
    images: [
        
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
    videos: [
        
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

module.exports = mongoose.model("EduContent", eduContentSchema);