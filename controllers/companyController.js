const Company = require("../models/company");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCompany = async (req, res, next) => {
  let company = await Company.find();
  if (!company) {
    res.status(404).send("No Company Found");
  } else {
    res.status(200).send(company);
  }
};
exports.getCompanyById = async (req, res, next) => {
  let company = await Company.findById({ _id: req.params.id });
  if (!company) {
    res.status(404).send("No Company Found");
  } else {
    res.status(200).send(company);
  }
};
exports.addCompany = async (req, res, next) => {
  let comp = await Company.findOne({ company_name: req.body.company_name });
  if (comp) {
    res.status(409).send("Company Already Exists");
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
    res.status(200).send("Company Added");
  }
};
exports.updateCompany = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });

  let update = await Company.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.status(200).json(update);
};
exports.deleteCompany = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  Company.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200).send({ message: `Deleted ${result.deletedCount} item.` });
    } else {
      res.status(401).send(`Delete failed `);
    }
  });
};
