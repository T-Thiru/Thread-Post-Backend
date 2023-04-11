const express = require("express");
const Post = require("../Models/Post");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const isAuthenticated = require("../middlewares/isAuthauticated");

const router = express.Router();

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    // const postsDetails = await posts.populate("user");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/", isAuthenticated, fileUpload(), async (req, res) => {
  try {
    console.log(req.body);
    const user = req.user;
    const photo = req.files?.picture;
    console.log(req.files?.picture);
    if (!req.body.message) {
      res.status(400).json({ message: "Veuillez ajouter un message" });
    }
    const newPost = new Post({
      message: req.body.message,
      author: user._id,
    });

    if (photo) {
      const postPhoto = await cloudinary.uploader.upload(
        convertToBase64(photo),
        { folder: `/blog/posts/${newPost._id}` }
      );

      Object.assign(newPost, {
        photo: postPhoto,
      });
    }

    await newPost.save();
    const finalPost = await newPost.populate("author");
    res.status(200).json(finalPost);
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
