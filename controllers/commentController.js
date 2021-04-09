const Comment = require("../models/job_app_comments");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getComment = async (req, res, next) => {
  let comment = await Comment.find();
  if (!comment) {
    res.status(404).send("No Comment Found");
  } else {
    res.status(200).send(comment);
  }
};
exports.getCommentByID = async (req, res, next) => {
  let comment = await Comment.findById({ _id: req.params.id });
  if (!comment) {
    res.status(404).send("No Comment Found");
  } else {
    res.status(200).send(comment);
  }
};
exports.addComment = async (req, res, next) => {
  let comment = await Comment.findOne({ comments: req.body.comments });
  if (comment) {
    res.status(409).send("Comment already exists");
  } else {
    let comments = new Comment(
      _.pick(req.body, [
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
    res.status(200).send("Comment Added");
  }
};
exports.updateComment = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Comment.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  let update = await Comment.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.send(200).json(update);
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
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
