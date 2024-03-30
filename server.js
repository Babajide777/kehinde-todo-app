const express = require("express");
require("dotenv").config();
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const toDoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Welcome to Kehinde's todo app");
});

//routes
app.use("/todo", toDoRoutes);

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(4000, () => {
      console.log("server listening on port 4000");
    });
  })
  .catch((err) => console.log(`Database Connection failed  ${err}`));
