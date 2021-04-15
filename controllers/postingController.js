const Post = require("../models/job_posting");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getPost = async (req, res, next) => {
  Post.find()
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.getPostById = async (req, res, next) => {
  Post.findById({ _id: req.params.id })
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
exports.addPost = async (req, res, next) => {
  let post = await Post.findOne({ job_title: req.body.job_title });
  if (post) {
    res.status(409).send("Post Already Exists");
  } else {
    let posts = new Post(
      _.pick(req.body, [
        "department",
        "category",
        "job_title",
        "job_type",
        "location",
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
    posts
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Post Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.updatePost = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Post.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Post.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deletePost = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Post.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Post Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
