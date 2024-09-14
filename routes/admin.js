const { Router } = require("express");
const router = Router();
const { Admin, Blogs } = require("../db");
const { JWT_SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const adminMiddleware = require("../middleware/admin");

// For SignUp
router.post("/signup", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  await Admin.create({
    username,
    password,
    email,
  });

  res.status(200).json({
    message: "Admin created successfully",
  });
});

// For Signin
router.post("/signin", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  const admin = await Admin.findOne({
    username,
    password,
    email,
  });

  if (admin) {
    const token = jwt.sign(
      {
        username,
      },
      JWT_SECRET_KEY
    );
    res.status(200).json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Email & Password",
    });
  }
});

// For Pending Blogs
router.get("/blogs", adminMiddleware, async (req, res) => {
  try {
    const pendingBlogs = await Blogs.find({
      status: "pending",
    }).populate("author", "username");
    res.json({ blogs: pendingBlogs });
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending blogs", err });
  }
});

// To update the Status
router.put("/blogs/:id", adminMiddleware, async (req, res) => {
  const blogId = req.params.id;
  const status = req.body.status;

  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  try {
    const updateBlogs = await Blogs.findByIdAndUpdate(
      blogId,
      { status },
      { new: true }
    );

    if (!updateBlogs) {
      return res.status(404).json({ message: "Blog post not found" });
    }

    res.json({ message: "Blog post updated successfully", blog: updateBlogs });
  } catch (err) {
    res.status(500).json({ message: "Error Updating Blogs", err });
  }
});

module.exports = router;
