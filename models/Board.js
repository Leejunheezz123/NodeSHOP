const numeral = require("numeral");
const { dateFormat, relPath } = require("../modules/util");
const createPager = require("../modules/pager-init");

module.exports = (sequelize, { DataTypes, Op }) => {
  const Board = sequelize.define(
    "Board",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      writer: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "board",
      paranoid: true,
    }
  );

  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      sourceKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Board.belongsTo(models.BoardInit, {
      foreignKey: {
        name: "binit_id",
        allowNull: false,
      },
      sourceKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Board.hasMany(models.BoardFile, {
      foreignKey: {
        name: "board_id",
        allowNull: false,
      },
      sourceKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    Board.hasMany(models.BoardComment, {
      foreignKey: {
        name: "board_id",
        allowNull: false,
      },
      sourceKey: "id",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  Board.getCount = async function (query) {
    return await this.count({
      where: { ...sequelize.getWhere(query), binit_id: query.boardId },
    });
  };

  Board.searchList = async function (query, BoardFile, BoardInit) {
    let { field = "id", sort = "desc", boardId, page = 1 } = query;
    if (!boardId) {
      let { id } = await BoardInit.findOne({
        attributes: ["id"],
        order: [["id", "asc"]],
        offset: 0,
        limit: 1,
      });
      boardId = id;
    }

    const totalRecord = await this.getCount(query);
    const pager = createPager(page, totalRecord, (_listCnt = 5), (_pagerCnt = 5));

    const rs = await this.findAll({
      order: [[field, sort]],
      offset: pager.startIdx,
      limit: pager.listCnt,
      where: { ...sequelize.getWhere(query), binit_id: boardId },
      include: [{ model: BoardFile, attributes: ["saveName"] }],
    });
    const lists = rs
      .map((v) => v.toJSON())
      .map((v) => {
        v.updatedAt = dateFormat(v.updatedAt);
        if (v.BoardFiles.length) v.thumbSrc = relPath(v.BoardFiles[0].saveName);
        delete v.createdAt;
        delete v.deletedAt;
        delete v.BoardFiles;
        return v;
      });

    return { lists, pager, totalRecord: numeral(pager.totalRecord).format() };
  };

  return Board;
};
