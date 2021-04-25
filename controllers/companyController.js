const Company = require("../models/company");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getCompany = async (req, res, next) => {
  const pageSize = 20;
  const pageNumber = 1;
  Company.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
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
    let company = await new Company(
      _.pick(req.body, [
        "company_name",
        "company_slug",
        "company_logo",
        "industry_type",
        "created_by",
        "modified_by",
      ])
    );
    company
      .save()
      .then((doc) => {
        res.status(200).json({
          message: "Company Added Successfully",
          results: doc,
        });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  }
};
exports.companyUploadImage = async (req, res, next) => {
  var obj = {
    profile_image: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: "image/png",
    },
  };
  imgModel.create(obj, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.save();
    }
  });
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
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Company.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Company Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
