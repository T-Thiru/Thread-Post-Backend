const express = require("express");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const User = require("../Models/User");

const router = express.Router();

const convertToBase64 = (file) => {
  return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
};

router.post("/user", async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ token: req.body.token });
    if (user) {
      res.status(200).json({
        _id: user._id,
        token: user.token,
        account: user.account,
      });
    } else {
      res.status(409).json({ message: "compte pas trouvé" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/signup", fileUpload(), async (req, res) => {
  try {
    console.log(req.body);
    // console.log(req.files?.picture);
    const user = await User.findOne({ email: req.body.email });
    const avatar = req.files?.picture;

    if (user) {
      res.status(409).json({ message: "Email déjà utilisé" });
    } else {
      if (req.body.email && req.body.password && req.body.username) {
        const token = uid2(64);
        const salt = uid2(64);
        const hash = SHA256(req.body.password + salt).toString(encBase64);

        const newUser = new User({
          email: req.body.email,
          token: token,
          hash: hash,
          salt: salt,
          account: {
            username: req.body.username,
          },
        });

        if (avatar) {
          const avatarToBe = await cloudinary.uploader.upload(
            convertToBase64(avatar),
            { folder: `/blog/users/${newUser._id}` }
          );

          Object.assign(newUser.account, {
            avatar: avatarToBe,
          });
        }

        await newUser.save();
        res.status(200).json({
          _id: newUser._id,
          token: newUser.token,
          account: newUser.account,
        });
      } else {
        res.status(400).json({ message: "Missing parameters" });
      }
    }
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const loginUser = await User.findOne({ email: email });

    if (loginUser) {
      const hash = SHA256(password + loginUser.salt).toString(encBase64);

      if (hash === loginUser.hash) {
        res.json({
          id: loginUser.id,
          token: loginUser.token,
          account: loginUser.account,
        });
      } else {
        res.json({
          error: "unauthorized",
        });
      }
    } else {
      res.json({
        error: "invalid email",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
