const express = require('express');
const router = express.Router();
const Sortie = require('../models/Sortie');
const Produit = require('../models/Produit');

router.get('/', async (req, res) => {
  const sorties = await Sortie.findAll({ include: Produit });
  res.render('sorties/index', { sorties });
});

router.get('/nouveau', async (req, res) => {
  const produits = await Produit.findAll();
  res.render('sorties/nouveau', { produits });
});

router.post('/', async (req, res) => {
  await Sortie.create(req.body);
  res.redirect('/sorties');
});

module.exports = router;
