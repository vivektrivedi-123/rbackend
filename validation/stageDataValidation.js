const { body, validationResult } = require("express-validator");

const stageDataValidation = () => {
  return [body("stageData").isLength({ min: 3, max: 100 })];
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

module.exports = { stageDataValidation, validateSchema };
