const Department = require("../models/department");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getCompany = async (req, res, next) => {
  let department = await Department.find();
  if (!department) {
    res.status(404);
  } else {
    res.send(department);
  }
};
exports.getDeptById = async (req, res, next) => {
  let department = await Department.findById({ _id: req.params.id });
  if (!department) {
    res.status(404);
  } else {
    res.send(department);
  }
};
exports.addDept = async (req, res, next) => {
  let dept = await Department.findOne({ company_name: req.body.company_name });
  if (dept) {
    res.status(409);
  } else {
    let deptt = new Department(
      _.pick(req.body, [
        "location_id",
        "department_name",
        "created_by",
        "modified_by",
      ])
    );
    await deptt.save();
    res.status(200);
  }
};
exports.updateDept = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(404);
  Department.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  let update = await Department.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  await update.save();
  res.json(update);
};

exports.deleteDept = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(404);
  Department.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Department.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
