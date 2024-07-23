const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');
const { isAdmin } = require('./auth');


router.get('/utilisateurs', async (req, res) => {
    try {
        if (req.session.utilisateur && req.session.utilisateur.role === 'admin') {
            const utilisateurs = await Utilisateur.findAll();
            res.render('utilisateurs', { utilisateurs });
        } else {
            res.status(403).send('Accès interdit.');
        }
    } catch (error) {
        res.status(500).send('Erreur récupération des utilisateurs.');
    }
});


router.get('/utilisateurs/nouveau', isAdmin, (req, res) => {
    res.render('utilisateur-nouveau');
});


router.post('/utilisateurs', isAdmin, async (req, res) => {
    try {
        await Utilisateur.create({
            nom_utilisateur: req.body.nom_utilisateur,
            mot_de_passe: req.body.mot_de_passe,
            role: req.body.role
        });
        res.redirect('/utilisateurs');
    } catch (error) {
        res.status(400).send('Erreur ajout de l\'utilisateur.');
    }
});


router.get('/utilisateurs/editer/:id', isAdmin, async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByPk(req.params.id);
        res.render('utilisateur-editer', { utilisateur });
    } catch (error) {
        res.status(500).send('Erreur récupération de l\'utilisateur.');
    }
});


router.post('/utilisateurs/editer/:id', isAdmin, async (req, res) => {
    try {
        const { nom_utilisateur, role } = req.body;
        await Utilisateur.update({ nom_utilisateur, role }, { where: { id: req.params.id } });
        res.redirect('/utilisateurs');
    } catch (error) {
        res.status(400).send('Erreur modification de l\'utilisateur.');
    }
});


router.post('/utilisateurs/supprimer/:id', isAdmin, async (req, res) => {
    try {
        await Utilisateur.destroy({ where: { id: req.params.id } });
        res.redirect('/utilisateurs');
    } catch (error) {
        res.status(400).send('Erreur suppression de l\'utilisateur.');
    }
});

module.exports = router;
