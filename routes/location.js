const locationController = require("../controllers/locationController");
const express = require("express");
const {
  locationValidation,
  validateSchema,
} = require("../validation/locationValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const isValid = require("../middleware/validID")
const Location = require("../models/location");
/**
 * @swagger
 * components:
 *  schemas:
 *   Location:
 *    type: object
 *    required:
 *     - company
 *     - location_address
 *     - location_name
 *     - location_city
 *     - location_state
 *     - postal_code
 *     - country
 *     - currency
 *     - primary_language
 *     - time_zone
 *     - date_format
 *    properties:
 *                          id:
 *                              type: string
 *                              description: Auto-Generated ID of Location
 *                          company:
 *                              type: string
 *                              default: The ID of the company
 *                          location_address:
 *                              type: string
 *                              default: industrial area
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY

 */
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location:
 *  get:
 *      security:
 *        - Bearer: []
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
 *   security:
 *        - Bearer: []
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
router.get("/api/v1/location/:id", auth, isValid, locationController.getLocationById);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location:
 *  post:
 *      security:
 *        - Bearer: []
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
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
 *   security:
 *        - Bearer: []
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
 *       type: string
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
 *                          
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
*/
router.put(
  "/api/v1/location/:id",
  auth, isValid,
  locationValidation(),
  validateSchema,
  locationController.putLocation
);
/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
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
router.delete("/api/v1/location/:id", auth, isValid ,locationController.deleteLocation);

/**
 * @swagger
 * tags:
 *  name: Location
 * /api/v1/location/{id}:
 *  put:
 *   security:
 *        - Bearer: []
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
 *       type: string
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
 *                          
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
 *                          location_name:
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
 *                          country:
 *                              type: string
 *                              default: 91
 *                          currency:
 *                              type: string
 *                              default: Rupees
 *                          primary_language:
 *                              type: string
 *                              default: English
 *                          time_zone:
 *                              type: string
 *                              default: GMT+5:30
 *                          date_format:
 *                              type: string
 *                              default: DD/MM/YYYY
*/

//patch
router.patch(
  "/api/v1/location/:id",
  auth, isValid,
  locationController.patchLocation
);
module.exports = router;
