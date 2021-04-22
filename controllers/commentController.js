const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/comments");
const application = require("../models/application");
const _ = require("lodash");

exports.getComment = async (req, res, next) => {
  Comment.find()
    .select("-_id -__v")
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: {
          path: "department",
          select: "-_id -__v",
          populate: {
            path: "location",
            select: "-_id -__v",
            populate: { path: "company", select: "-_id -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: { path: "category", select: "-_id -__v -location" },
      },
    })
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
exports.getCommentById = async (req, res, next) => {
  Comment.findById({ _id: req.params.id })
    .select("-_id -__v")
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: {
          path: "department",
          select: "-_id -__v",
          populate: {
            path: "location",
            select: "-_id -__v",
            populate: { path: "company", select: "-_id -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "job",
        select: "-_id -__v",
        populate: { path: "category", select: "-_id -__v -location" },
      },
    })
    .populate({
      path: "application",
      select: "-_id -__v",
      populate: {
        path: "form",
        select: "-_id -__v",
      },
    })
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
exports.addComment = async (req, res, next) => {
  let comments = await new Comment(
    _.pick(req.body, [
      "application",
      "comments",
      "attachments",
      "status",
      "created_by",
      "modified_by",
    ])
  );
  comments
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Comment Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
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
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Comment.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Comment Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
