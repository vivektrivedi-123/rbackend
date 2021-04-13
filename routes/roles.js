const rolesController = require("../controllers/rolesController");
const express = require("express");
const {
  roleValidation,
  validateSchema,
} = require("../validation/rolesValidation");
const router = express.Router();
const Role = require("../models/role");

router.get("/api/v1/role", rolesController.getRoles);

router.get("/api/v1/role/:id", rolesController.getRolesById);

router.post(
  "/api/v1/role",
  roleValidation(),
  validateSchema,
  rolesController.addRoles
);

router.put(
  "/api/v1/role/:id",
  roleValidation(),
  validateSchema,
  rolesController.updateRoles
);

router.delete("/api/v1/role/:id", rolesController.deleteRoles);
module.exports = router;
