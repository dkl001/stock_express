const express = require('express');
const router = express.Router();
const { isAdmin } = require('./auth');
const Sequelize = require('sequelize');
const Utilisateur = require('./models/utilisateur');


router.get('/login', (req, res) => {
    res.render('login');
});


router.post('/login', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findOne({
            where: { nom_utilisateur: req.body.nom_utilisateur }
        });

        if (utilisateur && utilisateur.mot_de_passe === req.body.mot_de_passe) { 
            req.session.utilisateur = utilisateur; 
            res.redirect('/');
        } else {
            res.status(401).send('Nom d\'utilisateur ou mot de passe incorrect.');
        }
    } catch (error) {
        res.status(500).send('Erreur lors de la connexion.');
    }
});


router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

module.exports = router;
