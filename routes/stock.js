const express = require('express');
const router = express.Router();
const Produit = require('../models/Produit');
const { isAdmin } = require('./auth');


router.get('/produits', async (req, res) => {
    try {
        const produits = await Produit.findAll();
        res.render('produits', { produits });
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération des produits.');
    }
});


router.get('/produits/nouveau', isAdmin, (req, res) => {
    res.render('produit-nouveau');
});


router.post('/produits', isAdmin, async (req, res) => {
    try {
        await Produit.create(req.body);
        res.redirect('/produits');
    } catch (error) {
        res.status(400).send('Erreur ajout du produit.');
    }
});

router.get('/produits/editer/:id', isAdmin, async (req, res) => {
    try {
        const produit = await Produit.findByPk(req.params.id);
        res.render('produit-editer', { produit });
    } catch (error) {
        res.status(500).send('Erreur récupération du produit.');
    }
});


router.post('/produits/editer/:id', isAdmin, async (req, res) => {
    try {
        const { nom, stock } = req.body;
        await Produit.update({ nom, stock }, { where: { id: req.params.id } });
        res.redirect('/produits');
    } catch (error) {
        res.status(400).send('Erreur modification du produit.');
    }
});


router.post('/produits/supprimer/:id', isAdmin, async (req, res) => {
    try {
        await Produit.destroy({ where: { id: req.params.id } });
        res.redirect('/produits');
    } catch (error) {
        res.status(400).send('Erreur suppression du produit.');
    }
});

module.exports = router;
