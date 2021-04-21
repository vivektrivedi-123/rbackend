require("express-async-errors");
require("dotenv").config();
const error = require("./middleware/error");
const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const paginate = require("express-paginate");
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
const options = require("./routes/options");
const app = express();

app.use("/public", express.static(path.join(__dirname, "static")));
app.use(bodyparser.urlencoded({ extended: false }));
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
app.use("/", options);
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
