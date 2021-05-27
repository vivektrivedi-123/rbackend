const express = require("express");
const taskController = require("../controllers/taskController");
const {
  taskValidation,
  validateSchema,
} = require("../validation/taskValidation");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/task");

/**
 * @swagger
 * components:
 *  schemas:
 *   Task:
 *    type: object
 *    required:
 *     - application
 *     - title
 *     - description
 *     - assigned_to
 *     - due_date
 *     - due_time
 *     - remind_before
 *     - status
 *    properties:
 *                          id:
 *                              type: string
 *                              description: Auto-Generated ID of Task
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          description:
 *                              type: string
 *                              description: Description of the task
 *                          assigned_to:
 *                              type: string
 *                              description: Assignment of the task
 *                          due_date:
 *                              type: string
 *                              description: Due date of the task                   
 *                          due_time:
 *                              type: string
 *                              description: Due time of the task
 *                          remind_before:
 *                              type: string
 *                              description: Remind before about the task
 *                          status:
 *                              type: string
 *                              description: Status of the task
 *         
 *    
 */
/**
 * @swagger
 * tags:
 *  name:Task
 * /api/v1/task:
 *  get:
 *      security:
 *        - Bearer: []
 *      tags: [Task]
 *      summary: Get all tasks
 *      responses:
 *          default:
 *              description: This is the default response for it
 */
router.get("/api/v1/task", auth, taskController.getTask);
/**
 * @swagger
 * tags:
 *  name: Task
 * /api/v1/task/{id}:
 *  get:
 *   security:
 *        - Bearer: []
 *   tags: [Task]
 *   summary: Get task by ID
 *   description: Get task data by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the task
 *      example: id
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.get("/api/v1/task/:id", auth, taskController.getTaskById);
/**
 * @swagger
 * tags:
 *  name: Task
 * /api/v1/task:
 *  post:
 *      security:
 *        - Bearer: []
 *      tags: [Task]
 *      summary: Add task
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          description:
 *                              type: string
 *                              description: Description of the task
 *                          assigned_to:
 *                              type: string
 *                              description: Assignment of the task
 *                          due_date:
 *                              type: string
 *                              description: Due date of the task                   
 *                          due_time:
 *                              type: string
 *                              description: Due time of the task
 *                          remind_before:
 *                              type: string
 *                              description: Remind before about the task
 *                          status:
 *                              type: string
 *                              description: Status of the task
 *      responses:
 *          200:
 *             description: A successful response
 *          default:
 *              description: This is the default response for it
 */
router.post(
  "/api/v1/task",
  auth,
  taskValidation(),
  validateSchema,
  taskController.addTask
);
/**
 * @swagger
 * tags:
 *  name: Task
 * /api/v1/task/{id}:
 *  put:
 *   security:
 *        - Bearer: []
 *   tags: [Task]
 *   summary: update task
 *   description: update task
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
 *      description: id of the task
 *      example: 2
 *    - in: body
 *      name: body
 *      required: true
 *      description: body object
 *      schema:
 *       type: object
 *       properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          description:
 *                              type: string
 *                              description: Description of the task
 *                          assigned_to:
 *                              type: string
 *                              description: Assignment of the task
 *                          due_date:
 *                              type: string
 *                              description: Due date of the task                   
 *                          due_time:
 *                              type: string
 *                              description: Due time of the task
 *                          remind_before:
 *                              type: string
 *                              description: Remind before about the task
 *                          status:
 *                              type: string
 *                              description: Status of the task
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          description:
 *                              type: string
 *                              description: Description of the task
 *                          assigned_to:
 *                              type: string
 *                              description: Assignment of the task
 *                          due_date:
 *                              type: string
 *                              description: Due date of the task                   
 *                          due_time:
 *                              type: string
 *                              description: Due time of the task
 *                          remind_before:
 *                              type: string
 *                              description: Remind before about the task
 *                          status:
 *                              type: string
 *                              description: Status of the task
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *                          application:
 *                              type: string
 *                              description: ID of the application
 *                          title:
 *                              type: string
 *                              description: Title of the task
 *                          description:
 *                              type: string
 *                              description: Description of the task
 *                          assigned_to:
 *                              type: string
 *                              description: Assignment of the task
 *                          due_date:
 *                              type: string
 *                              description: Due date of the task                   
 *                          due_time:
 *                              type: string
 *                              description: Due time of the task
 *                          remind_before:
 *                              type: string
 *                              description: Remind before about the task
 *                          status:
 *                              type: string
 *                              description: Status of the task
 */
router.put(
  "/api/v1/task/:id",
  auth,
  taskValidation(),
  validateSchema,
  taskController.putTask
);
/**
 * @swagger
 * tags:
 *  name: Task
 * /api/v1/task/{id}:
 *  delete:
 *   security:
 *        - Bearer: []
 *   tags: [Task]
 *   summary: delete task
 *   description: delete task
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: string
 *      required: true
 *      description: id of the role
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    404:
 *     description: Id not found
 */
router.delete("/api/v1/task/:id", auth, taskController.deleteTask);

//patch
router.patch(
  "/api/v1/task/:id",
  auth,
  taskController.patchTask
);
module.exports = router;
