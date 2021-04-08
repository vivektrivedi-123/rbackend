const Department = require("../models/department");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCompany = async (req, res, next) => {
  let department = await Department.find();
  if (!department) {
    res.send("Not Found").status(404);
  } else {
    res.send(department);
  }
};
exports.getDeptById = async (req, res, next) => {
  let department = await Department.findById({ _id: req.params.id });
  if (!department) {
    res.send("Invalid ID").status(404);
  } else {
    res.send(department);
  }
};
exports.addDept = async (req, res, next) => {
  let dept = await Department.findOne({ company_name: req.body.company_name });
  if (dept) {
    res.send("Company Already Exists");
  } else {
    let deptt = new Department(
      _.pick(req.body, [
        "company_id",
        "company_name",
        "company_slug",
        "company_logo",
        "industry_type",
        "created_by",
        "modified_by",
      ])
    );
    await deptt.save();
    res.send("Registered");
  }
};
exports.updateDept = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Department.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.send({ message: "ID in the body is not matching ID in the URL" });
  });

  let update = await Department.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};
exports.deleteDept = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Department.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.send({ message: "Invalid id" });
  });
  Department.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res
        .status(200)
        .send({ message: `Deleted ${result.deletedCount} record.` });
    } else {
      console.log("Could not delete a record");
      res.status(200).send(`Delete failed `);
    }
  });
};
