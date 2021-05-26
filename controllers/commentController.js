const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Comment = require("../models/comments");
const application = require("../models/application");
const _ = require("lodash");
// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(doc|DOC|txt|pdf|TXT|PDF|jpg|png|JPG|PNG|JPEG|jpeg)$/))
//       return cb(new Error("This is not a correct format of the file"));
//     cb(undefined, true);
//   },
// });

exports.getComment = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Comment.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
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
        path: "forms",
        select: "-_id -__v -job",
        populate: { path: "field", select: "-_id -__v -location" },
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
    .select(" -__v")
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
        path: "forms",
        select: "-_id -__v -job",
        populate: { path: "field", select: "-_id -__v -location" },
      },
    })
    .exec()
    .then((doc, err) => {
      if (doc) {
        res.status(200).json({
          results: doc,
        });
      } else {
        res.send("ID does not exists").status(404);
      }
    })

    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.addComment = async (req, res, next) => {
  let attachments = JSON.stringify(req.files);
  console.log(req.files);
  let comments = await new Comment(
    _.pick(req.body, [
      "application",
      "comments",
      "status",
      "created_by",
      "modified_by",
    ])
  );
  comments.attachments = attachments;
  comments
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Comment Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
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
    req.body,
    { new: true }
  );
  await update.save();
  res.status(200).send(update);
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
