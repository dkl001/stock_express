// const express = require('express');
// const bodyParser = require('body-parser');
// const sequelize = require('./config/database');
// const Categorie = require('./models/categorie');
// const Produit = require('./models/Produit');
// const Entree = require('./models/Entree');
// const Sortie = require('./models/Sortie');
// const Utilisateur = require('./models/Utilisateur');
// const routesCategories = require('./routes/categories');
// const routesProduits = require('./routes/produits');
// const routesEntrees = require('./routes/entrees');
// const routesSorties = require('./routes/sorties');
// const routesUtilisateurs = require('./routes/users');
// const path = require('path');
// const session = require('express-session');
// const bcrypt = require('bcrypt');
// const stockRoutes = require('./routes/stock');
// const Utilisateur = require('../models/utilisateur');



// app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.set('view engine', 'ejs');

// // sequelize.sync()
// //   .then(() => {
// //     console.log('Base de données et tables créées!');
// //   })
// //   .catch(err => {
// //     console.error('Impossible de créer les tables, arrêt...', err);
// //     process.exit(1);
// //   });

// app.use('/categories', routesCategories);
// app.use('/produits', routesProduits);
// app.use('/entrees', routesEntrees);
// app.use('/sorties', routesSorties);

// const produitRoutes = require('./routes/produitRoutes');
// const stockRoutes = require('./routes/stockRoutes');

// app.use(produitRoutes);
// app.use(stockRoutes);
// app.get('/', async (req, res) => {
//   const produits = await Produit.findAll({ include: Categorie });
//   const entrees = await Entree.findAll({ include: Produit });
//   const sorties = await Sortie.findAll({ include: Produit });
//   console.log(produits);
//   res.render('index', { produits, entrees, sorties });
// });


// app.listen(3000, () => {
//   console.log('Le serveur fonctionne sur le port 3000');
// });




const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const sequelize = require('./config/database');
const utilisateurRoutes = require('./routes/users');
const produitRoutes = require('./routes/produits');
const stockRoutes = require('./routes/stock');
const Utilisateur = require('./models/Utilisateur');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
    secret: 'mot_de_passe',
    resave: false,
    saveUninitialized: true
}));

// sequelize.sync()
//   .then(() => {
//     console.log('Base de données et tables créées!');
//   })
//   .catch(err => {
//     console.error('Impossible de créer les tables, arrêt...', err);
//     process.exit(1);
//   });

sequelize.authenticate()
  .then(() => {
    console.log('Connection etablie.');
  })
  .catch(err => {
    console.error('problem de connection a la base de donnee:', err);
  });

  app.get('/', async (req, res) => {
    res.render('index'); });

const controle = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};


const tacheAdmin = (role) => {
    return (req, res, next) => {
        if (req.session.user && req.session.user.role === role) {
            next();
        } else {
            res.status(403).send('Accès interdit');
        }
    };
};

app.get('/', controle, async (req, res) => {
    const produits = await Produit.findAll({ include: Categorie });
    const entrees = await Entree.findAll({ include: Produit });
    const sorties = await Sortie.findAll({ include: Produit });
    console.log(produits);
    res.render('index', { produits, entrees, sorties });
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', async (req, res) => {
    try {
        const user = await Utilisateur.findOne({ where: { nom_utilisateur: req.body.nom_utilisateur, role: 'admin' } });
        if (user && await bcrypt.compare(req.body.mot_de_passe, user.mot_de_passe)) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.status(401).send("Nom d'utilisateur ou mot de passe incorrect");
        }
    } catch (error) {
        res.status(500).send('Erreur authentification :'+ error.message);
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});


app.use('/utilisateurs', controle, tacheAdmin('admin'), utilisateurRoutes);
app.use('/produits', controle, produitRoutes);
app.use('/stocks', controle, stockRoutes);


sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Serveur est sut le port 3000');
        });
    })
    .catch((error) => {
        console.error('Erreur :', error);
    });
