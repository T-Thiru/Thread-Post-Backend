const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  res.json({ message: "GET" });
});

router.post("/", async (req, res) => {
  console.log(req.body);
  res.json({ message: "POST" });
});

router.put("/", async (req, res) => {
  console.log(req.params);
  res.json({ message: "PUT" });
});

router.delete("/", async (req, res) => {
  console.log(req.params);
  res.json({ message: "DELETE" });
});

router.patch("/like-post/:id", async (req, res) => {
  console.log(req.params);
  res.json({ message: "LIKE" });
});

router.patch("/dislike-post/:id", async (req, res) => {
  console.log(req.params);
  res.json({ message: "DISLIKE" });
});

module.exports = router;
