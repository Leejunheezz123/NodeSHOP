const path = require("path");
const fs = require("fs-extra");
const express = require("express");
const { Op } = require("sequelize");
const router = express.Router();
const { Board, BoardFile } = require("../../models");
const boardInit = require("../../middlewares/boardinit-mw");

router.get(
  "/",
  (req, res, next) => {
    req.boardId = 5;
    next();
  },
  boardInit(),
  async (req, res, next) => {
    try {
      const { lists, pager } = await Board.getList(req.query.id, null, BoardFile);
      console.log("======");
      console.log(lists[0]);
      res.status(200).json({ list: lists[0] });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
);

module.exports = { name: "/banner", router };
