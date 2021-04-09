const Task = require("../models/job_app_tasks");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getTask = async (req, res, next) => {
  let task = await Task.find();
  if (!task) {
    res.status(404);
  } else {
    res.send(task);
  }
};
exports.getTaskByID = async (req, res, next) => {
  let task = await Task.findById({ _id: req.params.id });
  if (!task) {
    res.status(400);
  } else {
    res.send(task);
  }
};
exports.addTask = async (req, res, next) => {
  let task = await Task.findOne({
    application_task_id: req.body.application_task_id,
  });
  if (task) {
    res.status(409);
  } else {
    let tasks = new Task(
      _.pick(req.body, [
        "application_task_id",
        "application_id",
        "location_id",
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
    await tasks.save();
    res.send("Registered");
  }
};
exports.updateTask = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Task.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deleteTask = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Task.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Task.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
