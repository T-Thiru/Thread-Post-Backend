// import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//import configs
const connectDB = require("./Config/db");
const cloudinaryConnect = require("./Config/cloudinary");

// variable declarations
const app = express();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/post", require("./Routes/posts"));
app.use("/user", require("./Routes/signuplogin"));

// connect to DB
connectDB();
//connect to cloudinary
cloudinaryConnect();

// server is listening on port
app.listen(process.env.PORT, () => console.log(`Server has started`));

// pour les routes inexistantes
app.all("*", (req, res) => {
  res.status(404).json({
    message: "not available routes",
  });
});
