const linkInit = require("../modules/link-init");

module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.init = linkInit.admin;
  res.locals.current = req.path;
  res.locals.currents = req.path.split("/");
  res.locals.currents.shift();
  res.locals.second = "/" + res.locals.currents[0];
  res.locals.second += res.locals.currents[1] ? "/" + res.locals.currents[1] : "";
  next();
};

/* 
path : {
  current: 현재경로
  currents: 경로 배열
  second: 2depth 경로
}
*/
