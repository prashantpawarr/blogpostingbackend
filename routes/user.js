const { Router } = require("express");
const { User, Blogs } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const userMiddleware = require("../middleware/user");
const multer = require("multer");
const path = require("path");

// For SignUp
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  const email = req.body.email;

  await User.create({
    username,
    password,
    role,
    email,
  });

  res.status(200).json({
    message: "User created successfully!",
  });
});

// For Signin
router.post("/signin", async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const user = await User.findOne({
    password,
    email,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
        email,
      },
      JWT_SECRET_KEY,
      { expiresIn: "0.5h" }
    );
    res.status(200).json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Invalid email or password",
    });
  }
});

// To add Blogs

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/blogs",
  userMiddleware,
  upload.single("file"),
  async (req, res) => {
    const { title, content } = req.body;

    try {
      const user = await User.findOne({ email: req.user.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const blog = await Blogs.create({
        title,
        content,
        author: user._id,
        status: "pending",
        image: req.file.filename,
      });

      res.json({ message: "Blog submitted for review", blogId: blog._id });
    } catch (err) {
      res.status(500).json({ message: "Error submitting blog post", err });
    }
  }
);

// To get all the Approved Blogs
router.get("/blogs", userMiddleware, async (req, res) => {
  try {
    const approvedBlogs = await Blogs.find({
      author: { $in: [req.user.id] },
      status: "approved",
    }).populate("author", "username");

    if (approvedBlogs.length === 0) {
      res.json({
        message: "Your blogs are not approved yet",
      });
    }

    res.status(200).json({
      ApprovedBlogs: approvedBlogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error getting all blog post", err });
  }
});

// To get all the blogs
router.get("/myblogs", userMiddleware, async (req, res) => {
  try {
    const userBlogs = await Blogs.find({
      author: { $in: [req.user.id] },
      status: { $in: ["approved", "rejected", "pending"] },
    }).populate("author", "username");

    res.status(200).json({
      myBlogs: userBlogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error getting user blog posts", err });
  }
});

module.exports = router;