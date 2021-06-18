const Email = require("../models/email");
const mongoose = require("mongoose");
const _ = require("lodash");
const application = require("../models/application");
const location = require("../models/location");
const forms = require("../models/forms");

exports.getEmail = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Email.find()
    .skip(skip)
    .limit(limit)
    .select(" -__v")
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job",
        populate: { path: "field", select: " -__v -location" },
      },
    })

    .exec()
    .then((data) => {
      res.status(200).json({
        results: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};

exports.getEmailById = async (req, res, next) => {
  Email.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: {
          path: "department",
          select: " -__v",
          populate: {
            path: "location",
            select: " -__v",
            populate: { path: "company", select: " -__v" },
          },
        },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "job",
        select: " -__v",
        populate: { path: "category", select: " -__v -location" },
      },
    })
    .populate({
      path: "application",
      select: " -__v",
      populate: {
        path: "forms",
        select: " -__v -job",
        populate: { path: "field", select: " -__v -location" },
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

exports.addEmail = async (req, res, next) => {
  let emails = new Email(
    _.pick(req.body, [
      "application",
      "from",
      "to",
      "body",
      "status",
      "created_by",
      "modified_by",
    ])
  );
  emails
    .save()
    .then((doc) => {
      res.status(200).json({
        message: "Email Added Successfully",
        results: doc,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
};

exports.putEmail = async (req, res, next) => {
  Email.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Email.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    await update.save();
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.patchEmail = async (req, res, next) => {
  Email.findOne({ _id: req.params.id }, function (err, doc) {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let update = await Email.findByIdAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
    });
    await update.save();
    res.status(200).json(update);
    
  } catch (error) {
    res.status(500).json({message:error.message})
  }
};

exports.deleteEmail = async (req, res, next) => {
 try {
   let email = await Email.findByIdAndDelete({_id:req.params.id})
   if(email){
     res.status(200).json({message:"email deleted successfully"})
   } else{
     res.status(400).json({message:"email not found"})
   }
 } catch (error) {
   res.status(500).json({message:error.message})
 }
};
