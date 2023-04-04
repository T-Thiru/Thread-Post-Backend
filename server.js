// import dependencies
const express = require("express");
const connectDB = require("./Config/db");
require("dotenv").config();

// connect to DB
connectDB();

// variable declarations
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./Routes/PostRoutes"));

// server is listening on port
app.listen(port, () => console.log(`Server has started on port ${port}`));

// pour les routes inexistantes
app.all("*", (req, res) => {
  res.status(404).json({
    message: "not available routes",
  });
});
