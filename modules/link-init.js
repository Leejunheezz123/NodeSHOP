module.exports = {
  admin: {
    index: [],
    user: [{ path: "", method: "POST", name: "회원 저장" }],
    board: [
      { path: "init", method: "GET", name: "게시판 관리" },
      { path: "", method: "GET", name: "게시물 관리" },
    ],
  },
};
