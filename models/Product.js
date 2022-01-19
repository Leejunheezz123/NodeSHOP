const _ = require("lodash");
const { dateFormat, relPath } = require("../modules/util");

module.exports = (sequelize, { DataTypes, Op }) => {
  const Product = sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      priceOrigin: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      priceSale: {
        type: DataTypes.INTEGER(10),
        allowNull: true,
      },
      amount: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: -1,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["0", "1", "2"],
        defaultValue: "2",
      },
      summary: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      tableName: "product",
      paranoid: true,
    }
  );

  Product.associate = (models) => {
    Product.belongsToMany(models.Cate, {
      foreignKey: {
        name: "prd_id",
        allowNull: false,
      },
      through: "cate_product",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  };

  return Product;
};
