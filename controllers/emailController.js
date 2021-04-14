const Email = require("../models/job_app_email");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getEmail = async (req, res, next) => {
  let email = await Email.find();
  if (!email) {
    res.status(404).send("No Email Found");
  } else {
    res.status(200).send(email);
  }
};
exports.getEmailById = async (req, res, next) => {
  let email = await Email.findById({ _id: req.params.id });
  if (!email) {
    res.status(404).send("No Email Found");
  } else {
    res.status(200).send(email);
  }
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
  await emails.save();
  res.status(200).send("Registered");
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
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Email.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Email.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
