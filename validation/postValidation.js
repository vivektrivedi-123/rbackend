const { body, validationResult } = require("express-validator");

const postValidation = () => {
  return [
    body("job_title").isLength({ min: 3, max: 15 }),
    body("job_type").isLength({ min: 5, max: 20 }),
    body("remote_job").isLength({ min: 5, max: 50 }),
    body("job_description").isLength({ min: 10, max: 100 }),
    body("experience").isLength({ min: 5, max: 50 }),
    body("skills").isLength({ min: 10, max: 50 }),
    body("tags").isLength({ min: 5, max: 20 }),
    body("min_sal").isLength({ min: 5, max: 20 }),
    body("max_sal").isLength({ min: 5, max: 20 }),
    body("currency").isLength({ min: 5, max: 50 }),
    body("allow_employee").isLength({ min: 5, max: 50 }),
    body("status").isLength({ min: 5, max: 20 }),
    body("job_code").isLength({ min: 5, max: 20 }),
    body("job_slug").isLength({ min: 5, max: 50 }),
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

module.exports = { postValidation, validateSchema };
