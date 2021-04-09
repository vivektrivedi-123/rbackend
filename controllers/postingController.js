const Post = require("../models/job_posting");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getPost = async (req, res, next) => {
  let post = await Post.find();
  if (!post) {
    res.status(404);
  } else {
    res.send(post);
  }
};
exports.getPostByID = async (req, res, next) => {
  let post = await Post.findById({ _id: req.params.id });
  if (!post) {
    res.status(400);
  } else {
    res.send(post);
  }
};
exports.addPost = async (req, res, next) => {
  let post = await Post.findOne({ form_id: req.body.form_id });
  if (post) {
    res.status(409);
  } else {
    let posts = new Post(
      _.pick(req.body, [
        "job_id",
        "department_id",
        "category_id",
        "job_title",
        "job_type",
        "location_id",
        "remote_job",
        "job_description",
        "experience",
        "skills",
        "tags",
        "min_sal",
        "max_sal",
        "currency",
        "allow_employees",
        "status",
        "job_code",
        "job_slug",
        "created_by",
        "modified_by",
      ])
    );
    await posts.save();
    res.send("Registered");
  }
};
exports.updatePost = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Post.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deletePost = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Post.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
