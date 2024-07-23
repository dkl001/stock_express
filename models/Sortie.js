const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produit = require('./Produit');

const Sortie = sequelize.define('Sortie', {
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
  createdAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'sorties',
  timestamps: true,
});


module.exports = {Sortie};


