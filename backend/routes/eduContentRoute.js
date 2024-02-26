const express = require("express");
const { getAllEduContent, createEduContent, updateEduContent, deleteEduContent, getEduContentDetails } = require("../controllers/eduContentController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");
const router = express.Router();

router.route("/edu/new").post(isAuthenticatedUser, authorizeRoles("admin"), createEduContent);
router.route("/edu/get-all").get(isAuthenticatedUser, getAllEduContent);
router.route("/edu/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateEduContent).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEduContent).get(isAuthenticatedUser, getEduContentDetails);

module.exports = router