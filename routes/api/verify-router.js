const path = require("path");
const express = require("express");
const router = express.Router();
const { User } = require("../../models");

router.get("/", async (req, res, next) => {
  try {
    let { key, value } = req.query;
    let where = key === "userid" ? { userid: value } : { email: value };
    const rs = await User.findAll({ where });
    res.status(200).json(!rs.length);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = { name: "/verify", router };
