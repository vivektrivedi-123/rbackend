const { body, validationResult } = require("express-validator");

const stageValidation = () => {
  return [body("stage").isLength({ min: 3, max: 15 })];
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

module.exports = { stageValidation, validateSchema };