const express = require("express");
const {getAllEduContent,createEduContent,updateEduContent,deleteEduContent}= require("../controllers/eduContentController.js");
const router=express.Router();

router.route("/edu/new").post(createEduContent);
router.route("/edu/get-all").get(getAllEduContent);
router.route("/edu/:id").put(updateEduContent);
router.route("/edu/:id").delete(deleteEduContent);

module.exports=router