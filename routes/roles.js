const rolesController = require("../controllers/rolesController");
const express = require("express");
const _ = require("lodash");
const router = express.Router();
const Role = require("../models/role");

router.get("/api/v1/role", rolesController.getRoles);

//router.get("/api/v1/role/:id", rolesController.getRolesById);

router.post("/api/v1/role", rolesController.addRoles);

router.put("/api/v1/role/:id", rolesController.updateRoles);

router.delete("/api/v1/role/:id", rolesController.deleteRoles);
module.exports = router;
