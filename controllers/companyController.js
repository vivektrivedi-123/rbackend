const Company = require("../models/company");
const mongoose = require("mongoose");
const _ = require("lodash");

exports.getCompany = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);

  Company.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
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
    .select(" -__v")
    .exec()
    .then((doc, err) => {
      if (doc) {
        res.status(200).json({
          results: doc,
        });
      } else {
        res.send("ID does not exists").status(404);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};

exports.addCompany = async (req, res, next) => {
  let comp = await Company.findOne({ company_name: req.body.company_name });
  if (comp) {
    res.status(409).send("Company Already Exists");
  } else {
    let logo = req.files.company_logo[0].path;
    let favicon = req.files.favicon[0].path;
    let company = await new Company(
      _.pick(req.body, [
        "company_name",
        "industry",
        "company_language",
        "date_format",
        "employee_portal_name",
        "employee_portal_url",
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

exports.putCompany = async (req, res, next) => {
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let logo = req.files.company_logo[0].path;
  let favicon = req.files.favicon[0].path;
  let update = await Company.findByIdAndUpdate({ _id: req.params.id },{
   company_name :req.body.company_name,
   industry:req.body.industry,
   company_language:req.body.company_language,
   date_format:req.body.date_format,
   employee_portal_name:req.body.employee_portal_name,
   employee_portal_url:req.body.employee_portal_url,
   company_logo:logo,
   favicon:favicon
  },
    { new: true });

  await update.save();
  res.json({message:"Updated Company ",update}).status(200);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchCompany = async (req, res, next) => {
  Company.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let logo = JSON.stringify(req.files.company_logo[0].path);
    let favicon = JSON.stringify(req.files.favicon[0].path);
    let update = await Company.findByIdAndUpdate({ _id: req.params.id },{
     company_name :req.body.company_name,
     industry:req.body.industry,
     company_language:req.body.company_language,
     date_format:req.body.date_format,
     employee_portal_name:req.body.employee_portal_name,
     employee_portal_url:req.body.employee_portal_url,
     company_logo:logo,
     favicon:favicon
    },
      { new: true });
    await update.save();
    res.json({message:"Updated Company ",update}).status(200);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteCompany = async (req, res, next) => {
 try {
   let company = await Company.findByIdAndDelete({_id:req.params.id})
   if(company) {
     res.status(200).json({message:"company deleted successfully"})
   } else{
     res.status(400).json({message:"company not found"})
   }
 } catch (error) {
   res.status(500).json({message:error.message})
 }
};
