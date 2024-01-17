const EduContent = require('../models/eduContentModel.js');

exports.createEduContent = async (req,res,next)=>{
    const eduContent = await EduContent.create(req.body);
    res.status(201).json({
        success:true,
        eduContent
    })
}

exports.getAllEduContent = async (req,res) =>{
    const eduContentList = await EduContent.find();
    res.status(200).json({
        success:true,
        eduContentList
    });
}

exports.updateEduContent = async (req,res,next) =>{
    let eduContent = await EduContent.findById(req.params.id);
    if(!eduContent){
        return res.status(500).json({
            success:false,
            message:"eduContent not found"
        })
    }
    eduContent = await EduContent.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success:true,
        eduContent
    });
}

exports.deleteEduContent = async (req,res,next) =>{

    let eduContent = await EduContent.findById(req.params.id);

    if(!eduContent){
        return res.status(500).json({
            success:false,
            message:"EduContent not found"
        });
    }
    
    await eduContent.deleteOne(eduContent);

    res.status(200).json({
        success:true,
        message: "EduContent Delete Successfully",
    });
}