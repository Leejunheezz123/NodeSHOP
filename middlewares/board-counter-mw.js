const { BoardCounter, Board } = require("../models");

module.exports = async (req, res, next) => {
  try {
    const ip = req.ip;
    const referrer = req.get("Referer") || req.get("Referrer") || null;
    const user_id = null;
    await BoardCounter.create({
      ip,
      referrer,
      user_id,
      board_id: req.params.id,
    });
    await Board.update();
    next();
  } catch (err) {
    next(err);
  }
};
