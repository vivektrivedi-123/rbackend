const Company = require("../models/company");
const mongoose = require("mongoose");
const multer = require("multer");
const _ = require("lodash");
const upload = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});
const favicon = multer({
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

exports.getCompany = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  Company.find()
    .skip(skip)
    .limit(limit)
    .select("-_id -__v")
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
exports.getCompanyById = async (req, res, next) => {
  Company.findById({ _id: req.params.id })
    .select("-_id -__v")
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
exports.addCompany = async (req, res, next) => {
  let comp = await Company.findOne({ company_name: req.body.company_name });
  if (comp) {
    res.status(409).send("Company Already Exists");
  } else {
    let logo = JSON.stringify(req.files);
    let favicon = JSON.stringify(req.files);
    let company = await new Company(
      _.pick(req.body, [
        "company_name",
        "industry",
        "company_language",
        "date_format",
        "employee_portal_name",
        "employee_portal_url",
        "company_logo",
        "favicon",
        "created_by",
        "modified_by",
      ])
    );
    company.company_logo = logo;
    company.favicon = favicon;
    company
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Company Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
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
  res.send("Updated Succesfully").status(200);
  await update.save();
};
exports.deleteCompany = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Company.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Company Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
