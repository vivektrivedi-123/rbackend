const rolesController = require("../controllers/rolesController");
const express = require("express");
const {
  roleValidation,
  validateSchema,
} = require("../validation/rolesValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Role = require("../models/role");

router.get("/api/v1/role", auth, rolesController.getRoles);

router.get("/api/v1/role/:id", auth, rolesController.getRolesById);

router.post(
  "/api/v1/role",
  auth,
  roleValidation(),
  validateSchema,
  rolesController.addRoles
);

router.put(
  "/api/v1/role/:id",
  auth,
  roleValidation(),
  validateSchema,
  rolesController.updateRoles
);

router.delete("/api/v1/role/:id", auth, rolesController.deleteRoles);
module.exports = router;
