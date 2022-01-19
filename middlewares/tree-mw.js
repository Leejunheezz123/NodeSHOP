const fs = require("fs-extra");
const path = require("path");

module.exports = (file = "../json/tree.json") => {
  return async (req, res, next) => {
    try {
      req.tree = await fs.readJson(path.join(__dirname, file));
      next();
    } catch (err) {
      next(err);
    }
  };
};
