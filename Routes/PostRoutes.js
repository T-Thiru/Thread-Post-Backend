const express = require("express");
const Post = require("../Models/PostModel");

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  if (!req.body.message)
    res.status(400).json({ message: "Veuillez ajouter un message" });
  const newPost = await Post.create({
    message: req.body.message,
    author: req.body.author,
  });
  res.status(200).json({ message: newPost });
});

router.put("/:id", async (req, res) => {
  console.log(req.params);
  const post = await Post.findById(req.params.id);
  if (!post) res.status(400).json({ message: "ce post n'existe pas" });
  post.message = req.body.message;
  await post.save();
  res.status(200).json(post);
});

router.delete("/:id", async (req, res) => {
  console.log(req.params);
  const post = await Post.findById(req.params.id);
  if (!post) res.status(400).json({ message: "ce post n'existe pas" });
  post.deleteOne();
  res.json({ message: "Post Supprimé" });
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
