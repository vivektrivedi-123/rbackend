const { body, validationResult } = require("express-validator");

const interviewValidation = () => {
  return [
    body("duration").isLength({ min: 5, max: 15 }),
    body("recommendations").isLength({ min: 5,max:50 }),
    body("interviewer").isLength({ min: 5 ,max: 20}),
    body("notes").isLength({ min: 5, max: 50 }),
  ];
};
const validateSchema = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

module.exports = { interviewValidation, validateSchema };
