const express = require("express");
const router = express.Router();

const queries = require("../../middlewares/query-mw");
const { Product, ProductFile, CateProduct, Cate } = require("../../models");

// 리스트
router.get("/", queries(), async (req, res, next) => {
  try {
    const { lists, pager, totalRecord } = await Product.getLists(req.query, ProductFile);
    // res.json({ lists, pager, totalRecord });
    res.render("admin/prd/prd-list", { lists, pager, totalRecord });
  } catch (err) {
    next(createError(err));
  }
});

// 상세페이지
router.get("/:id", queries(), async (req, res, next) => {
  try {
    const prd = await Product.findProduct(req.params.id, Cate, ProductFile);
    const cate = prd.Cates.map((v) => v.id);
    res.render("admin/prd/prd-update", { prd, cate, _ });
  } catch (err) {
    next(createError(err));
  }
});

module.exports = { name: "/prd", router };
