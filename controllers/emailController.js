const Email = require("../models/email");
const mongoose = require("mongoose");
const _ = require("lodash");
const application = require("../models/application");
const location = require("../models/location");
const PER_PAGE = 5;
exports.getEmail = async (req, res, next) => {
  let email = await Email.find();
  Email.find()
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
exports.getEmailById = async (req, res, next) => {
  Email.findById({ _id: req.params.id })
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
exports.addEmail = async (req, res, next) => {
  let emails = new Email(
    _.pick(req.body, [
      "application",
      "location",
      "from",
      "to",
      "body",
      "status",
      "created_by",
    ])
  );
  emails
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Application Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};
exports.updateEmail = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Email.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Email.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deleteEmail = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Email.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Email Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
