const { body, validationResult } = require("express-validator");

const fieldValidation = () => {
  return [
    body("field_name").isLength({ min: 3, max: 50 }),
    body("field_type").isLength({ min: 10, max: 50 }),
    body("field_options").isLength({ min: 5, max: 50 }),
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

module.exports = { fieldValidation, validateSchema };
