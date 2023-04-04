// import dependencies
const express = require("express");

// variable declarations
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/post", require("./Routes/Post"));

// server is listening on port
app.listen(port, () => console.log("Server has started on port " + port));
