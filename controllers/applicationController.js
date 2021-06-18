const mongoose = require("mongoose");
const forms = require("../models/forms");
const job = require("../models/job");
const Application = require("../models/application");
const _ = require("lodash");
const department = require("../models/department");
const category = require("../models/category");

exports.getApplication = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Application.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "department",
        select: "-__v",
        populate: {
          path: "location",
          select: " -__v",
          populate: {
            path: "company",
            select: " -__v",
          },
        },
      },
    })

    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
    .populate({
      path: "forms",
      select: " -__v -job",
      populate: { path: "field", select: " -__v -location" },
    })
    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).send(err);
    });
};

exports.getApplicationById = async (req, res, next) => {
  Application.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "department",
        select: " -__v",
        populate: {
          path: "location",
          select: " -__v",
          populate: { path: "company", select: "-__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: " -__v ",
      populate: {
        path: "category",
        select: " -__v -location",
      },
    })
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

exports.addApplication = async (req, res, next) => {
  let resume = JSON.stringify(req.file.path);
  let applications = await new Application(
    _.pick(req.body, [
      "job",
      "forms",
      "form_values",
      "origin",
      "tags",
      "status",
      "overall_rating",
      "lead_owner",
      "is_deleted",
      "is_blocked",
      "social_profiles",
      "refer_by",
      "add_to_talent_pool",
      "created_by",
      "modified_by",
    ])
  );
  applications.resume = resume;
  applications
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Application Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.putApplication = async (req, res, next) => {
  Application.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) return res.status(400).json({message:"application is allready exist"})
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  try {
    let resume = JSON.stringify(req.file.path);
  let update = await Application.findByIdAndUpdate({ _id: req.params.id },
    {
      form_values:req.body.form_values,
      origin:req.body.origin,
      tags:req.body.tags,
      status:req.body.status,
      overall_rating:req.body.overall_rating,
      lead_owner:req.body.lead_owner,
      is_deleted:req.body.is_deleted,
      is_blocked:req.body.is_blocked,
      social_profiles:req.body.social_profiles,
      refer_by:req.body.refer_by,
      add_to_talent_pool:req.body.add_to_talent_pool,
      resume:resume
    },
    { new: true }
  );
  await update.save();
  res.status(200).json({ message: "Application Updated", update });
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};
  

exports.patchApplication = async (req, res, next) => {
  Application.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null)
      res.status(400).send("ID in the body is not matching ID in the URL");
  });
  try {
    let resume = JSON.stringify(req.file.path);
    let update = await Application.findByIdAndUpdate({ _id: req.params.id },
      {
        form_values:req.body.form_values,
        origin:req.body.origin,
        tags:req.body.tags,
        status:req.body.status,
        overall_rating:req.body.overall_rating,
        lead_owner:req.body.lead_owner,
        is_deleted:req.body.is_deleted,
        is_blocked:req.body.is_blocked,
        social_profiles:req.body.social_profiles,
        refer_by:req.body.refer_by,
        add_to_talent_pool:req.body.add_to_talent_pool,
        resume:resume
      },
      { new: true }
    );
    await update.save();
    res.json({ message: "Application Updated", update }).status(200);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
 
};


exports.deleteApplication = async (req, res, next) => {
 try {
   const application = await Application.findByIdAndDelete({_id:req.params.id})
   if(application){
     res.status(200).json({message:"application deleted successfully"})
   } else{
     res.status(400).json({message:"application not found !"})
   }
 } catch (error) {
  res.status(500).json({message:error.message})
 }
};
