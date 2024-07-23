const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produit = require('./Produit');

const Entree = sequelize.define('Entree', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  produit_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: Produit,
      key: 'id',
    },
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  
}, {
  tableName: 'entrees',
  timestamps: true,
});



module.exports = { Entree };
