const express = require("express");

const router = express.Router();

router.get("/post", async (req, res) => {
  res.json({ message: "post" });
});

module.exports = router;
