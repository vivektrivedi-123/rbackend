const _ = require("lodash");
const validate = require("express-validator");
const Candidate = require("../models/candidate");
const stageData = require("../models/stageData");
//get candidate by ID
exports.getCandidateById = async (req, res, next) => {
  Candidate.findById({ _id: req.params.id })
    .select(" -__v")
    .populate({
      path: "stage",
      select: "-__v",
      populate: {
        path: "stageData",
        select: "-job -__v",
        populate: {
          path: "stages",
        },
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
  Candidate.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let candidate = await Candidate.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    await candidate.save();
    res.status(200).send(candidate); 
  } catch (error) {
    res.status(500).json({message:error.message})
  }
  
};

//patch
exports.patchCandidate = async (req, res, next) => {
  Candidate.findOne({ _id: req.params.id }, (err, doc) => {
    if (err) console.log(err);
    else if (doc === null) res.status(400).send("Invalid Request");
  });
  try {
    let candidate = await Candidate.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      {
        new: true,
      }
    );
    await candidate.save();
    res.status(200).send(candidate);
  } catch (error) {
    res.status(500).json({message:error.message})
  } 
};

//delete Candidate
exports.deleteCandidate = async (req, res, next) => {
  try {
    const candidate = await Candidate.findByIdAndDelete({_id:req.params.id})
    if(candidate){
      res.status(200).json({message:"Candidate deleted successfully"})
    } else{
      res.status(400).json({message:"candidate not found !"})
    }
  } catch (error) {
   res.status(500).json({message:error.message})
  }
};
