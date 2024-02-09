const express = require("express");
const {getAllEduContent,createEduContent,updateEduContent,deleteEduContent,getEduContentDetails}= require("../controllers/eduContentController.js");
const router=express.Router();

router.route("/edu/new").post(createEduContent);
router.route("/edu/get-all").get(getAllEduContent);
router.route("/edu/:id").put(updateEduContent).delete(deleteEduContent).get(getEduContentDetails);

module.exports=router