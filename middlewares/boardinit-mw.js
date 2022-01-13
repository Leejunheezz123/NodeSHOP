/* 
req.query.boardId -> 현재 게시판 정보
전체 게시판 정보
*/
const _ = require("lodash");
const { BoardInit } = require("../models");

module.exports = async (req, res, next) => {
  let { boardId } = req.query;
  const boardLists = await BoardInit.findAll({
    order: [["id", "desc"]],
  });
  const [myBoard] = boardLists.filter((v, i) => {
    if (i === 0 && !boardId) boardId = v.id;
    return v.id == boardId;
  });

  res.locals.boardLists = _.sortBy(boardLists, "title");
  res.locals.boardId = boardId;
  res.locals.boardType = myBoard.boardType;
  res.locals.boardTitle = myBoard.title;
  res.locals.useImg = myBoard.useImg;
  res.locals.useFile = myBoard.useFile;
  res.locals.useComment = myBoard.useComment;
  console.log(res.locals.boardType);
  next();
};
