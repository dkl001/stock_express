const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Entree = require('./Entree');
const Sortie = require('./Sortie');
const Categorie = require('./categorie');

const Produit = sequelize.define('Produit', {
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prix: {
    type: DataTypes.DECIMAL(20, 0),
    allowNull: false,
  },
  categorie_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: Categorie,
      key: 'id',
    },
  },
  
}, {
  tableName: 'produits',
  timestamps: true,
});




module.exports =  Produit;
