require('dotenv').config();
const Sequelize = require('sequelize');

let sequelize;

if (process.env.JAWSDB_URL) {
  // If running on Heroku, use the JawsDB MySQL database
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If running locally, use your local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'ble5mmo2o5v9oouq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mysql',
      database: 'c153m86emzv8xuoh',
      port: 3306
    }
  );
}

module.exports = sequelize;
