module.exports = (_field = "query", addQuery = []) => {
  return (req, res, next) => {
    req[_field].type = req[_field].type || "";
    req[_field].field = req[_field].field || "id";
    req[_field].search = req[_field].search || "";
    req[_field].sort = req[_field].sort || "desc";
    req[_field].page = req[_field].page || 1;
    req[_field].status = req[_field].status || "";
    req[_field].binit = req[_field].binit || "";
    for (let value of addQuery) {
      let k = Object.keys(value);
      let [v] = Object.values(value);
      req[_field][k] = req[_field][k] || v;
    }
    for (let [k, v] of Object.entries(req[_field])) res.locals[k] = v;

    res.locals.goList = `?page=${page}`;
    if (res.locals.currents[1] === "board") {
      res.locals.goList += `&boardId=${boardId}&`;
    }
    if (req[_field].field && req[_field].search) {
      res.locals.goList += `&field=${req[_field].field}`;
      res.locals.goList += `&search=${req[_field].search}`;
    }
    if (req[_field].sort) {
      res.locals.goList += `&sort=${req[_field].sort}`;
    }
    res.locals.goLists = [
      { page: req[_field].page },
      { boardId: req[_field].boardId },
      { field: req[_field].field },
      { search: req[_field].search },
      { sort: req[_field].sort },
    ];
    next();
  };
};
