const linkInit = require("../modules/link-init");
module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.links = linkInit.admin;
  res.locals.path = req.originalUrl;
  const paths = req.originalUrl.split("/");
  paths.shift();
  res.locals.paths = paths;
  next();
};
