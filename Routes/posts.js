const express = require("express");
const Post = require("../Models/Post");
const isAuthenticated = require("../middlewares/isAuthauticated");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", isAuthenticated, async (req, res) => {
  try {
    console.log(req.body);
    const user = req.user;
    if (!req.body.message)
      res.status(400).json({ message: "Veuillez ajouter un message" });
    const newPost = await Post.create({
      message: req.body.message,
      author: user._id,
    });
    res.status(200).json({ message: newPost });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.findById(req.params.id);
    if (!post) res.status(400).json({ message: "ce post n'existe pas" });
    post.message = req.body.message;
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.findById(req.params.id);
    if (!post) res.status(400).json({ message: "ce post n'existe pas" });
    post.deleteOne();
    res.json({ message: "Post Supprimé" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.patch("/like-post/:id", async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.body.userId } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.patch("/dislike-post/:id", async (req, res) => {
  try {
    console.log(req.params);
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.body.userId } },
      { new: true }
    );
    res.status(200).json(post);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
