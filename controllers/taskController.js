const Task = require("../models/task");
const mongoose = require("mongoose");
const _ = require("lodash");
const application = require("../models/application");
const location = require("../models/location");
const PER_PAGE = 5;
exports.getTask = async (req, res, next) => {
  Task.find()
    .populate("application")
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    .skip(PER_PAGE * page - PER_PAGE)
    .limit(PER_PAGE)
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
    .populate("application")
    .populate({
      path: "location",
      populate: { path: "company" },
    })
    .skip(PER_PAGE * page - PER_PAGE)
    .limit(PER_PAGE)
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
exports.addTask = async (req, res, next) => {
  let tasks = new Task(
    _.pick(req.body, [
      "application",
      "location",
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
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Task.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Task Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
