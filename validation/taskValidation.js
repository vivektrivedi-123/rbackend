const { body, validationResult } = require("express-validator");

const taskValidation = () => {
  return [
    body("title").isLength({ min: 5, max: 20 }),
    body("description").isLength({ min: 10, max: 50 }),
    body("assigned_to").isLength({ min: 3, max: 20 }),
    body("status").isLength({ min: 3, max: 20 }),
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

module.exports = { taskValidation, validateSchema };
