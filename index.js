require("express-async-errors");
require("dotenv").config();
const error = require("./middleware/error");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const multer = require("multer");
const company = require("./routes/company");
const role = require("./routes/roles");
const user = require("./routes/user");
const dept = require("./routes/department");
const field = require("./routes/field");
const application = require("./routes/jobApplication");
const category = require("./routes/jobCategory");
const comment = require("./routes/jobComment");
const email = require("./routes/jobEmail");
const form = require("./routes/jobForm");
const interview = require("./routes/jobInterview");
const job = require("./routes/jobPosting");
const stage = require("./routes/jobStages");
const task = require("./routes/jobTask");
const location = require("./routes/location");
const option = require("./routes/options");
const step = require("./routes/stepStage");
const basicAuth = require("express-basic-auth");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const { JsonWebTokenError } = require("jsonwebtoken");
const app = express();

const upload = multer({
  dest: path.join(__dirname, "./upload"),
});
const attachments = multer({
  dest: path.join(__dirname, "./attachments"),
});

const options = {
  definition: {
    openapi: "3.0.0",
    components: {
      securitySchemes: {
        Bearer: {
          type: "http",
          scheme: "bearer",
        },
        security: [
          {
            Bearer: [],
          },
        ],
      },
    },
    info: {
      title: "P-Hire Application",
      version: "1.0.0",
      description: "P-Hire API application documentation",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

app.use(cors());
app.use(
  "/api-docs",
  basicAuth({
    users: { apurvajaitly: "apurva" },
    challenge: true,
  }),
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use("/public", express.static(path.join(__dirname, "static")));
app.use("/upload", express.static("upload"));
app.use("/attachments", express.static("attachments"));
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use("/", company);
app.use("/", role);
app.use("/", user);
app.use("/", dept);
app.use("/", field);
app.use("/", application);
app.use("/", category);
app.use("/", comment);
app.use("/", email);
app.use("/", form);
app.use("/", interview);
app.use("/", job);
app.use("/", stage);
app.use("/", task);
app.use("/", location);
app.use("/", option);
app.use("/", step);
app.use(error);

mongoose
  .connect(
    "mongodb+srv://Apurva:apurva571@cluster0.beqgw.mongodb.net/p-hire?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected to database"))
  .catch((err) => console.log(err));

app.listen(3001, () => console.log(`listening on port 3001... `));
