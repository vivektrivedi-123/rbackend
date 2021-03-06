const { body, validationResult } = require("express-validator");

const optionsValidation = () => {
  return [
    body("option_key").isLength({ min: 5, max: 20 }),
    body("option_value").isLength({ min: 5, max: 20 }),
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

module.exports = { optionsValidation, validateSchema };
