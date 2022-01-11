const path = require("path");
const express = require("express");
const router = express.Router();
const { error } = require("../../modules/util");

router.get("/", (req, res, next) => {
  const ejs = {};
  res.render("admin/binit/board-init", ejs);
});

router.put("/", (req, res, next) => {
  res.send("/admin/binit:PUT");
});

router.delete("/", (req, res, next) => {
  res.send("/admin/binit:DELETE");
});

router.post("/", (req, res, next) => {
  res.send("/admin/binit:POST");
});

module.exports = { name: "/binit", router };
