const express = require('express');
const router = express.Router();
const Entree = require('../models/Entree');
const Produit = require('../models/Produit');

router.get('/', async (req, res) => {
  const entrees = await Entree.findAll({ include: Produit });
  res.render('entrees/index', { entrees });
});

router.get('/nouveau', async (req, res) => {
  const produits = await Produit.findAll();
  res.render('entrees/nouveau', { produits });
});

router.post('/', async (req, res) => {
  await Entree.create(req.body);
  res.redirect('/entrees');
});

module.exports = router;
