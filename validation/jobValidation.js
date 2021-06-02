const { body, validationResult } = require("express-validator");

const jobValidation = () => {
  return [
    body("job_title").isLength({ min: 3, max: 25 }),
    body("job_type").isLength({ min: 5, max: 50 }),
    body("branch").isLength({ min: 3, max: 60 }),
    body("job_description").isLength({ min: 10, max: 100 }),
    body("experience").isLength({ min: 5, max: 50 }),
    body("min_sal").isLength({ min: 5, max: 30 }),
    body("max_sal").isLength({ min: 5, max: 30 }),
    body("currency").isLength({ min: 3, max: 50 })

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

module.exports = { jobValidation, validateSchema };
