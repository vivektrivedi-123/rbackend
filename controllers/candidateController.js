const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const _ = require("lodash");
const validate = require("express-validator");
const Candidate = require("../models/candidate");
const company = require("../models/company");

//get
exports.getCandidate = async (req, res, next) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  Candidate.find()
    .skip(skip)
    .limit(limit)
    .select("-__v")
    .populate({
      path: "stage",
      select: "-__v -job",
      populate: {
        path: "stepStage",
        select: "-__v",
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

//get by ID
exports.getCandidateById = async (req, res, next) => {
  Candidate.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "stage",
      select: "-__v -job ",
      populate: {
        path: "stages",
        select: "-__v",
      },
    })
    .populate({
      path: "job",
      select: "-stages -__v",
      populate: {
        path: "department",
        select: " -__v",
        populate: {
          path: "location ",
          select: " -__v",
          populate: { path: "company", select: " -__v" },
        },
      },
    })
    .populate({
      path: "job",
      select: " -stages -__v ",
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
//Candidate login
// exports.CandidateLogin = async (req, res, next) => {
//   try {
//     const email = req.body.email;
//     const company = JSON.stringify(req.body.company);
//     const password = req.body.password;
//     let candidate = await Candidate.findOne({
//       email: req.body.email,
//       company: req.body.company,
//     });
//     if (!Candidate) return res.status(404).send("Candidate does not exists");

//     const validPassword = await bcrypt.compare(
//       req.body.password,
//       Candidate.password
//     );
//     if (!validPassword) return res.status(403).send("Invalid  Password.");

//     const token = jwt.sign({ _id: Candidate.id }, process.env.SECRET_KEY, {
//       expiresIn: "60m",
//     });
//     res
//       .header("Authorization", token)
//       .header("Access-Control-Expose-Headers", "Authorization")
//       .status(200);
//     res.json(token);
//   } catch (error) {
//     console.log(error);
//   }
// };

//add Candidate
exports.addCandidate = async (req, res, next) => {
  try {
    let candidate = new Candidate(
      _.pick(req.body, [
        "candidate_name",
        "applied_for",
        "owner",
        "applied_date",
        "star",
        "stage",
        "job",
        "created_by",
        "modified_by",
      ])
    );
    await candidate.save();
    res.status(200).json(candidate);
  } catch (err) {
    res.json(err);
  }
};

//put
exports.putCandidate = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Candidate.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let candidate = await Candidate.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  await candidate.save();
  res.status(200).send(candidate);
};

//patch
exports.patchCandidate = async (req, res, next) => {
  let id = req.params.id;
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid Request");
  Candidate.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  let candidate = await Candidate.findByIdAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
    }
  );
  await candidate.save();
  res.status(200).send(candidate);
};

//delete Candidate
exports.deleteCandidate = async (req, res, next) => {
  if (!req.params.id || req.params.id < 0)
    res.status(400).send("Invalid request");
  Candidate.findByIdAndRemove({ _id: req.params.id })
    .then((doc) => {
      res.status(200).json({
        message: "Candidate Deleted Successfully",
      });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};
