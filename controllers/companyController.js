const Company = require("../models/company");
const mongoose = require("mongoose");
const _ = require("lodash");
exports.getCompany = async (req, res, next) => {
  let company = await Company.find();
  if (!company) {
    res.status(404);
  } else {
    res.send(company);
  }
};
exports.getCompanyById = async (req, res, next) => {
  let company = await Company.findById({ _id: req.params.id });
  if (!company) {
    res.status(400);
  } else {
    res.send(company);
  }
};
exports.addCompany = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    let comp = await Company.findOne({ company_name: req.body.company_name });
    if (comp) {
      res.status(409);
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
      res.status(200);
    }
  } catch (err) {
    return next(err);
  }
};
exports.updateCompany = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });

  let update = await Company.findByIdAndUpdate(
    { _id: req.params.id },
    req.body
  );
  res.json(update);
};
exports.deleteCompany = async (req, res, next) => {
  let id = await req.params.id;
  if (!req.params.id || req.params.id < 0) res.status(400);
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400);
  });
  Company.deleteOne({ _id: req.params.id }).then((result) => {
    if (result.deletedCount > 0) {
      res.status(200);
    } else {
      res.status(401);
    }
  });
};
