const locationController = require("../controllers/locationController");
const express = require("express");
const {
  locationValidation,
  validateSchema,
} = require("../validation/locationValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Location = require("../models/location");

/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location:
 *  get:
 *      tags: [Location]
 *      summary: Get all locations
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/location", auth, locationController.getLocation);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location/{id}:
 *  get:
 *   tags: [Location]
 *   summary: Get location by ID
 *   description: Get location data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the location
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/location/:id", auth, locationController.getLocationById);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location:
 *  post:
 *      tags: [Location]
 *      summary: Add location
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          company:
 *                              type: string
 *                              default: The ID of the company
 *                          location_address:
 *                              type: string
 *                              default: industrial area
 *                          location_street:
 *                              type: string
 *                              default: phase 8b
 *                          location_city:
 *                              type: string
 *                              default: mohali
 *                          location_state:
 *                              type: string
 *                              default: Punjab
 *                          postal_code:
 *                              type: number
 *                              default: 140301
 *                          country_id:
 *                              type: string
 *                              default: 91
 *                          website:
 *                              type: string
 *                              default: rudrainnovativesoftware.com
 *                          contact:
 *                              type: number
 *                              default: 9856472156
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/location",
  auth,
  locationValidation(),
  validateSchema,
  locationController.addLocation
);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location/{id}:
 *  put:
 *   tags: [Location]
 *   summary: update location
 *   description: update location
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the location
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       type: object
 *       properties:
 *                          company:
 *                              type: string
 *                              default: The ID of the company
 *                          location_address:
 *                              type: string
 *                              default: industrial area
 *                          location_street:
 *                              type: string
 *                              default: phase 8b
 *                          location_city:
 *                              type: string
 *                              default: mohali
 *                          location_state:
 *                              type: string
 *                              default: Punjab
 *                          postal_code:
 *                              type: number
 *                              default: 140301
 *                          country_id:
 *                              type: string
 *                              default: 91
 *                          website:
 *                              type: string
 *                              default: rudrainnovativesoftware.com
 *                          contact:
 *                              type: number
 *                              default: 9856472156
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *        type: object
 *        properties:
 *                          company:
 *                              type: string
 *                              default: The ID of the company
 *                          location_address:
 *                              type: string
 *                              default: industrial area
 *                          location_street:
 *                              type: string
 *                              default: phase 8b
 *                          location_city:
 *                              type: string
 *                              default: mohali
 *                          location_state:
 *                              type: string
 *                              default: Punjab
 *                          postal_code:
 *                              type: number
 *                              default: 140301
 *                          country_id:
 *                              type: string
 *                              default: 91
 *                          website:
 *                              type: string
 *                              default: rudrainnovativesoftware.com
 *                          contact:
 *                              type: number
 *                              default: 9856472156
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *         type: object
 *         properties:
 *                          company:
 *                              type: string
 *                              default: The ID of the company
 *                          location_address:
 *                              type: string
 *                              default: industrial area
 *                          location_street:
 *                              type: string
 *                              default: phase 8b
 *                          location_city:
 *                              type: string
 *                              default: mohali
 *                          location_state:
 *                              type: string
 *                              default: Punjab
 *                          postal_code:
 *                              type: number
 *                              default: 140301
 *                          country_id:
 *                              type: string
 *                              default: 91
 *                          website:
 *                              type: string
 *                              default: rudrainnovativesoftware.com
 *                          contact:
 *                              type: number
 *                              default: 9856472156
*/
router.put(
  "/api/v1/location/:id",
  auth,
  locationValidation(),
  validateSchema,
  locationController.updateLocation
);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location/{id}:
 *  delete:
 *   tags: [Location]
 *   summary: delete location
 *   description: delete location
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the location
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/location/:id", auth, locationController.deleteLocation);
module.exports = router;
