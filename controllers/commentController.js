const Comment = require("../models/job_app_comments");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getComment = async (req, res, next) => {
  let comment = await Comment.find();
  if (!comment) {
    res.status(404);
  } else {
    res.send(comment);
  }
};
exports.getCommentByID = async (req, res, next) => {
  let comment = await Comment.findById({ _id: req.params.id });
  if (!stage) {
    res.status(400);
  } else {
    res.send(comment);
  }
};
exports.addComment = async (req, res, next) => {
  let comment = await Comment.findOne({ Comment_id: req.body.Comment_id });
  if (comment) {
    res.status(409);
  } else {
    let comments = new Comment(
      _.pick(req.body, [
        "Comment_id",
        "application_id",
        "location_id",
        "comments",
        "attachments",
        "status",
        "created_by",
        "modified_by",
      ])
    );
    await comments.save();
    res.send("Registered");
  }
};
exports.updateComment = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Comment.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};

exports.deleteComment = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Comment.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Comment.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
