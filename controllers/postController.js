const Post = require('../models/postModel.js');

exports.createPost = async (req,res,next)=>{
    const post = await Post.create(req.body);
    res.status(201).json({
        success:true,
        post
    })
}

exports.getAllPosts = async (req,res) =>{
    const posts = await Post.find();
    res.status(200).json({
        success:true,
        posts
    });
}

exports.updatePost = async (req,res,next) =>{
    let post = await Post.findById(req.params.id);
    if(!post){
        return res.status(500).json({
            success:false,
            message:"Post not found"
        })
    }
    post = await Post.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        post
    });
}

exports.deletePost = async (req,res,next) =>{

    let post = await Post.findById(req.params.id);

    if(!post){
        return res.status(500).json({
            success:false,
            message:"Post not found"
        });
    }
    
    await post.deleteOne(post);

    res.status(200).json({
        success:true,
        message: "Post Delete Successfully",
    });
}