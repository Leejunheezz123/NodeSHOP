const path = require("path");
const fs = require("fs-extra");
const express = require("express");
const router = express.Router();

fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const { name, router: childRotuer } = require(path.join(__dirname, file));
    router.use(name, childRotuer);
  });
router.get("/", (req, res, next) => {
  res.render("admin/index", { css: "admin-index" });
});

module.exports = router;
