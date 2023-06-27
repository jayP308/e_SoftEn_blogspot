const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Users = require('./Users');
const Reviews = require('./Reviews');

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'comments',
  }
);

Comments.belongsTo(Users, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

Comments.belongsTo(Reviews, {
  foreignKey: 'reviewId',
  onDelete: 'CASCADE',
});

module.exports = Comments;
