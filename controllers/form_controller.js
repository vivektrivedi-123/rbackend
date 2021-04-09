const Form = require("../models/job_form");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getForm = async (req, res, next) => {
  let form = await Form.find();
  if (!form) {
    res.status(404);
  } else {
    res.send(form);
  }
};
exports.getFormByID = async (req, res, next) => {
  let form = await Form.findById({ _id: req.params.id });
  if (!form) {
    res.status(400);
  } else {
    res.send(form);
  }
};
exports.addForm = async (req, res, next) => {
  let form = await Form.findOne({ form_id: req.body.form_id });
  if (form) {
    res.status(409);
  } else {
    let forms = new Form(
      _.pick(req.body, [
        "field_id",
        "location_id",
        "field_name",
        "field_type",
        "field_options",
        "created_by",
        "modified_by",
      ])
    );
    await forms.save();
    res.send("Registered");
  }
};
exports.updateForm = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Form.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Form.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json(update);
};

exports.deleteForm = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Form.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Form.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
