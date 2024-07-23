const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('gstock', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});


module.exports =  sequelize;