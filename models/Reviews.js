const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Users = require('./Users');

class Reviews extends Model{}

Reviews.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        topic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        postImage: {
            type: DataTypes.STRING, // Assuming you are storing the image path as a string
            allowNull: true
          },
    },
    {
        sequelize,
        freezeTableName: true,
        modelName: 'reviews'
    }
);

Reviews.belongsTo(Users, {
    foreignKey: 'userId', // The foreign key column in the Reviews table
    onDelete: 'CASCADE', // Optional: specify the deletion behavior
  });

module.exports = Reviews;