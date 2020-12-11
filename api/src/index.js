const Sequelize = require('sequelize');

const sequelize = new Sequelize('jdbc:mysql://admin:p4ssw0rd@localhost.com:3306/db');

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });