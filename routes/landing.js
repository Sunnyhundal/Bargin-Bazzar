const express = require("express");
const router = express.Router();

// GET /landing
// Show the featured items page
router.get("/", (req, res) => {
  const userId = req.cookies.userId;

  res.render("landing", { userId });
});

module.exports = router;
