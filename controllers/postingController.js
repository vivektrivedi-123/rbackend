const Post = require("../models/job_posting");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getPost = async (req, res, next) => {
  let post = await Post.find();
  if (!post) {
    res.status(404).send("Post Not Found");
  } else {
    res.send(post);
  }
};
exports.getPostByID = async (req, res, next) => {
  let post = await Post.findById({ _id: req.params.id });
  if (!post) {
    res.status(404).send("Post Not FOund");
  } else {
    res.status(200).send(post);
  }
};
exports.addPost = async (req, res, next) => {
  let post = await Post.findOne({ job_title: req.body.job_title });
  if (post) {
    res.status(409).send("Post Already Exists");
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
    res.status(200).send("Registered");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Post.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Post.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
