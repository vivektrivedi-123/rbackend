require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const path = require("path");
const company = require("./routes/company");
const role = require("./routes/roles");
const usercomp = require("./routes/Ucompany");
const app = express();

app.use("/public", express.static(path.join(__dirname, "static")));
app.use(
  bodyparser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use("/", company);
app.use("/", role);
app.use("/", usercomp);
mongoose
  .connect(
    "mongodb+srv://Apurva:apurva1234@cluster0.beqgw.mongodb.net/p-hire?retryWrites=true&w=majority",
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
