const { Router } = require("express");
const { Blogs } = require("../db");
const router = Router();

router.get("/allblogs", async (req, res) => {
  try {
    // Fetch approved blogs and populate author details
    const approvedBlogs = await Blogs.find({
      status: "approved",
    }).populate("author", "username image");

    if (approvedBlogs.length === 0) {
      return res.status(404).json({
        message: "No approved blogs found",
      });
    }

    res.status(200).json({
      approvedBlogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error retrieving blogs", err });
  }
});

module.exports = router;
