const mongoose = require("mongoose");
const Comment = require("../models/comments");
const application = require("../models/application");
const _ = require("lodash");

exports.getComment = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Comment.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job",
        populate: { path: "field", select: " -__v -location" },
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
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job",
        populate: { path: "field", select: " -__v -location" },
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

exports.putComment = async (req, res, next) => {
  Comment.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  try {
    let update = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).send(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchComment = async (req, res, next) => {
  Comment.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
   try {
    let update = await Comment.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    await update.save();
    res.status(200).send(update);
   } catch (error) {
     res.status(500).json({message:error.message})
   }
};

exports.deleteComment = async (req, res, next) => {
  try {
    let comment = await Comment.findByIdAndDelete({_id:req.params.id})
    if(comment){
      res.status(200).json({message:"comment deleted successfully"})
    } else{
      res.status(400).json({message:"comment not found"})
    }
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
