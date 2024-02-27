const express = require("express");
const { getAllEduContent, createEduContent, updateEduContent, deleteEduContent, getEduContentDetails, createComment, deleteComment, toggleLikeEduContent } = require("../controllers/eduContentController.js");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth.js");
const router = express.Router();

router.route("/edu/new").post(isAuthenticatedUser, authorizeRoles("admin"), createEduContent);
router.route("/edu/get-all").get(isAuthenticatedUser, getAllEduContent);
router.route("/edu/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateEduContent).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteEduContent).get(isAuthenticatedUser, getEduContentDetails);
router.route('/edu/:eduContentId/comments').post(isAuthenticatedUser, createComment);
router.route('/edu/:eduContentId/comments/:commentId').delete(isAuthenticatedUser, deleteComment);
router.route('/edu/:eduContentId/like').post(isAuthenticatedUser, toggleLikeEduContent);
module.exports = router