const postingController = require("../controllers/postingController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Post = require("../models/job_posting");

router.get("/api/v1/post", postingController.getPost);

//router.get("/api/v1/post/:id", postingController.getPostById);

router.post("/api/v1/post", postingController.addPost);

router.put("/api/v1/post/:id", postingController.updatePost);

router.delete("/api/v1/post/:id", postingController.deletePost);

module.exports = router;
