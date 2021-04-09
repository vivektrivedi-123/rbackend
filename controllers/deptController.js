const Department = require("../models/department");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getDept = async (req, res, next) => {
  let department = await Department.find();
  if (!department) {
    res.status(404).send("No Department Found");
  } else {
    res.status(200).send(department);
  }
};
exports.getDeptById = async (req, res, next) => {
  let department = await Department.findById({ _id: req.params.id });
  if (!department) {
    res.status(404).send("No Department Found");
  } else {
    res.status(200).send(department);
  }
};
exports.addDept = async (req, res, next) => {
  let dept = await Department.findOne({
    department_name: req.body.department_name,
  });
  if (dept) {
    res.status(409).send("Department Already Exists");
  } else {
    let deptt = new Department(
      _.pick(req.body, ["department_name", "created_by", "modified_by"])
    );
    await deptt.save();
    res.status(200).send("Department Added");
  }
};
exports.updateDept = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(404).send("Invalid Request");
  Department.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let update = await Department.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  await update.save();
  res.status(200).json(update);
};

exports.deleteDept = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(404).send("Invalid Request");
  Department.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Department.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(404).send(`Delete failed `);
    }
  });
};
