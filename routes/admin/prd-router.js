const path = require("path");
const express = require("express");
const router = express.Router();
const escape = require("escape-html");
const createError = require("http-errors");
const { error } = require("../../modules/util");
const { Product, ProductFile } = require("../../models");
const uploader = require("../../middlewares/multer-mw");
const afterUploader = require("../../middlewares/after-multer-mw");
const { moveFile } = require("../../modules/util");
const queries = require("../../middlewares/query-mw");

router.get("/", (req, res, next) => {
  if (req.query.type === "create") {
    res.render("admin/prd/prd-form");
  } else next();
});

router.get("/", async (req, res, next) => {
  try {
    res.render("admin/prd/prd-list");
  } catch (err) {
    next(createError(err));
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    res.render("admin/prd/prd-form");
  } catch (err) {
    next(createError(err));
  }
});

router.post(
  "/",
  uploader.fields([{ name: "img" }, { name: "detail" }]),
  afterUploader(["img", "detail"]),
  queries("body"),
  async (req, res, next) => {
    try {
      res.json({
        body: req.body,
        content: escape(req.body.content),
        files: req.files,
      });
      // req.body.content = escape(req.body.content);
      // await Product.create(req.body)
      // res.redirect('/admin/prd');
    } catch (err) {
      next(createError(err));
    }
  }
);

router.put("/", async (req, res, next) => {
  try {
    res.redirect("/admin/prd");
  } catch (err) {
    next(createError(err));
  }
});

router.delete("/", async (req, res, next) => {
  try {
    res.redirect("/admin/prd");
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: "/prd", router };
