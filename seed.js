// seed.js
const sequelize = require('./config/database');
const Categorie = require('../models/Categorie');
const Produit = require('./models/Produit');
const Entree = require('./models/Entree');
const Sortie = require('./models/Sortie');
const Utilisateur = require('./models/Utilisateur');

async function seed() {
  try {
    await sequelize.sync({ force: true }); 
    const categories = await Categorie.bulkCreate([
      { nom: 'Électronique' },
      { nom: 'Fournitures de bureau' },
      { nom: 'Nourriture' }
    ]);

    const produits = await Produit.bulkCreate([
      { nom: 'Ordinateur portable', description: 'Un ordinateur portable performant', prix: 1000.00, quantite: 50, categorieId: categories[0].id },
      { nom: 'Clavier', description: 'Un clavier ergonomique', prix: 50.00, quantite: 100, categorieId: categories[0].id },
      { nom: 'Stylo', description: 'Un stylo à bille bleu', prix: 1.50, quantite: 500, categorieId: categories[1].id },
      { nom: 'Chocolat', description: 'Barre de chocolat noir', prix: 2.00, quantite: 200, categorieId: categories[2].id }
    ]);

    const entrees = await Entree.bulkCreate([
      { produitId: produits[0].id, quantite: 10, date: new Date() },
      { produitId: produits[1].id, quantite: 20, date: new Date() },
      { produitId: produits[2].id, quantite: 100, date: new Date() },
      { produitId: produits[3].id, quantite: 50, date: new Date() }
    ]);

    const sorties = await Sortie.bulkCreate([
      { produitId: produits[0].id, quantite: 5, date: new Date() },
      { produitId: produits[1].id, quantite: 10, date: new Date() },
      { produitId: produits[2].id, quantite: 50, date: new Date() },
      { produitId: produits[3].id, quantite: 30, date: new Date() }
    ]);

    console.log('Les données fictives ont été insérées avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données fictives :', error);
  } finally {
    sequelize.close();
  }
}

seed();
