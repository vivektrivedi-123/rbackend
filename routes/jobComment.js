const commentController = require("../controllers/commentController");
const express = require("express");
const {
  commentValidation,
  validateSchema,
} = require("../validation/commentValidation");
const router = express.Router();
const Comment = require("../models/comments");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./attachments");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const attachments = multer({ storage: storage }).array("attachments",4);

router.get("/api/v1/comment", commentController.getComment);

router.get("/api/v1/comment/:id", commentController.getCommentById);

router.post(
  "/api/v1/comment",
  attachments,
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
