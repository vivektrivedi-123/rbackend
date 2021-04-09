const commentController = require("../controllers/commentController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Comment = require("../models/job_app_comments");

router.get("/api/v1/comment", commentController.getComment);

//router.get("/api/v1/comment/:id", commentController.getCommentById);

router.post("/api/v1/comment", commentController.addComment);

router.put("/api/v1/comment/:id", commentController.updateComment);

router.delete("/api/v1/comment/:id", commentController.deleteComment);

module.exports = router;
