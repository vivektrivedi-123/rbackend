const Task = require("../models/job_app_tasks");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getTask = async (req, res, next) => {
  let task = await Task.find();
  if (!task) {
    res.status(404).send("Invalid Request");
  } else {
    res.status(200).send(task);
  }
};
exports.getTaskById = async (req, res, next) => {
  let task = await Task.findById({ _id: req.params.id });
  if (!task) {
    res.status(400).send("Invalid Request");
  } else {
    res.status(200).send(task);
  }
};
exports.addTask = async (req, res, next) => {
  let tasks = new Task(
    _.pick(req.body, [
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
  res.status(200).send("Registered");
};
exports.updateTask = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Task.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Task.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deleteTask = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Task.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Task.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed`);
    }
  });
};
