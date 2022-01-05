const path = require("path");
const linkInit = require("../modules/link-init");

module.exports = (req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.path = {};
  res.locals.path.init = linkInit.admin;
  res.locals.path.current = req.path;
  res.locals.path.currents = req.path.split("/");
  res.locals.path.currents.shift();
  res.locals.path.second = "/" + res.locals.path.currents[0];
  res.locals.path.second += res.locals.path.currents[1]
    ? "/" + res.locals.path.currents[1]
    : "";
  console.log(res.locals.path.current, res.locals.path.second);
  next();
};

/* 
path : {
  current: 현재경로
  currents: 경로 배열
  second: 2depth 경로
}
*/
