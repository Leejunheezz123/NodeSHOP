const path = require("path");
const express = require("express");
const router = express.Router();
const { error } = require("../../modules/util");

router.get("/init", (req, res, next) => {
  res.render("admin/board/board-init", { css: "admin-board" });
});

router.get("/", (req, res, next) => {
  const boardType = req.query.type || "default";
  res.render("admin/board/board-list", { css: "admin-board", boardType });
});

router.get("/:id", (req, res, next) => {
  const boardType = req.query.type || "default";
  res.render("admin/board/board-view", { css: "admin-board", boardType });
});

router.post("/", (req, res, next) => {
  res.send("/admin/board:POST");
});
router.put("/", (req, res, next) => {
  res.send("/admin/board:PUT");
});
router.delete("/", (req, res, next) => {
  res.send("/admin/board:DELETE");
});
router.post("/init", (req, res, next) => {
  res.send("/admin/board/init:POST");
});

module.exports = { name: "/board", router };
