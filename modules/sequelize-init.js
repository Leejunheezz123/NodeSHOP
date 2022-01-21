module.exports = (sequelize) => {
  sequelize
    .sync({ force: true }) // 실제DBMNS랑 연동시켜줘
    .then(() => console.log("Sequelize Start!"))
    .catch((err) => console.log("Sequelize Error => ", err));
};
