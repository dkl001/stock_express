const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');
const Categorie = require('./models/Categorie');
const Produit = require('./models/Produit');
const Entree = require('./models/Entree');
const Sortie = require('./models/Sortie');
const path = require('path');
const session = require('express-session');
const Utilisateur = require('./models/Utilisateur');
const routesCategories = require('./routes/categories');
const routesProduits = require('./routes/produits');
const routesEntrees = require('./routes/entrees');
const routesSorties = require('./routes/sorties');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'mot_de_passe',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.set('view engine', 'ejs');

// sequelize.sync()
//   .then(() => {
//     console.log('Base de données et tables créées!');
//   })
//   .catch(err => {
//     console.error('Impossible de créer les tables, arrêt...', err);
//     process.exit(1);
//   });

app.use('/categories', routesCategories);
app.use('/produits', routesProduits);
app.use('/entrees', routesEntrees);
app.use('/sorties', routesSorties);

app.use('/login', routesLogin);

// app.get('/', (req, res) => {
//   res.render('index');
// });

app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(3000, () => {
  console.log('Le serveur fonctionne sur le port 3000');
});
