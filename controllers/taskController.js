const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/task");
const _ = require("lodash");
const application = require("../models/application");

exports.getTask = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Task.find()
    .select(" -__v")
    .skip(skip)
    .limit(limit)
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
exports.getTaskById = async (req, res, next) => {
  Task.findById({ _id: req.params.id })
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
exports.addTask = async (req, res, next) => {
  let tasks = new Task(
    _.pick(req.body, [
      "application",
      "title",
      "description",
      "assigned_to",
      "due_date",
      "due_time",
      "duration",
      "remind_before",
      "status",
      "created_by",
      "modified_by",
    ])
  );
  tasks
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Task Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.putTask = async (req, res, next) => {
  Task.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
  

exports.patchTask = async (req, res, next) => {
  Task.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true
    });
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteTask = async (req, res, next) => {
 try {
   let task = await Task.findByIdAndDelete({_id:req.params.id})
   if(task){
     res.status(200).json({message:"task deleted successfully"})
   } else{
     res.status(400).json({message:"task not found"})
   }
 } catch (error) {
   res.status(500).json({message:error.message})
 }
};
