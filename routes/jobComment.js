const commentController = require("../controllers/commentController");
const express = require("express");
const {
  commentValidation,
  validateSchema,
} = require("../validation/commentValidation");
const router = express.Router();
const Comment = require("../models/comments");

router.get("/api/v1/comment", commentController.getComment);

router.get("/api/v1/comment/:id", commentController.getCommentById);

router.post(
  "/api/v1/comment",
  commentValidation(),
  validateSchema,
  commentController.addComment
);

router.put(
  "/api/v1/comment/:id",
  commentValidation(),
  validateSchema,
  commentController.updateComment
);

router.delete("/api/v1/comment/:id", commentController.deleteComment);

module.exports = router;
