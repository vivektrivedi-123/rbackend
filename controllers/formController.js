const Form = require("../models/job_form");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getForm = async (req, res, next) => {
  let form = await Form.find();
  if (!form) {
    res.status(404).send("No Form Found");
  } else {
    res.status(200).send(form);
  }
};
exports.getFormById = async (req, res, next) => {
  let form = await Form.findById({ _id: req.params.id });
  if (!form) {
    res.status(404).send("No Form Found");
  } else {
    res.status(200).send(form);
  }
};
exports.addForm = async (req, res, next) => {
  let form = await Form.findOne({ label: req.body.label });
  if (form) {
    res.status(409).send("Form Already Exists");
  } else {
    let forms = new Form(
      _.pick(req.body, [
        "job",
        "field",
        "label",
        "placeholder",
        "is_required",
        "order",
        "location",
        "created_by",
        "modified_by",
      ])
    );
    await forms.save();
    res.status(200).send("Registered");
  }
};
exports.updateForm = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Form.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Form.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.status(200).json(update);
};

exports.deleteForm = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Form.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Form.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send("Delete Failed");
    }
  });
};
