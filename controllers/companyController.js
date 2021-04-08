const Company = require("../models/company");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCompany = async (req, res, next) => {
  let company = await Company.find();
  if (!company) {
    res.send("Not Found").status(404);
  } else {
    res.send(company);
  }
};
exports.getCompanyById = async (req, res, next) => {
  let company = await Company.findById({ _id: req.params.id });
  if (!company) {
    res.send("Invalid ID").status(404);
  } else {
    res.send(company);
  }
};
exports.addCompany = async (req, res, next) => {
  let comp = await Company.findOne({ company_name: req.body.company_name });
  if (comp) {
    res.send("Company Already Exists");
  } else {
    let company = new Company(
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
    await company.save();
    res.send("Registered");
  }
};
exports.updateCompany = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Company.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.send({ message: "ID in the body is not matching ID in the URL" });
  });

  let update = await Company.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};
exports.deleteCompany = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.send({ message: "Invalid request" });
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.send({ message: "Invalid id" });
  });
  Company.deleteOne({ _id: req.params.id }).then((result) => {
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
