const express = require('express');
const router = express.Router();
//const Categorie = require('../models/Categorie');
const Categorie = require('../models/categorie');

router.get('/', async (req, res) => {
  const categories = await Categorie.findAll();
  res.render('categories/index', { categories });
});

router.get('/nouveau', (req, res) => {
  res.render('categories/nouveau');
});

router.post('/', async (req, res) => {
  await Categorie.create(req.body);
  res.redirect('/categories');
});

module.exports = router;
