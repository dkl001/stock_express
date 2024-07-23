const isAdmin = (req, res, next) => {
    if (req.session.utilisateur && req.session.utilisateur.role === 'admin') {
        next();
    } else {
        res.status(403).send('Accès interdit.');
    }
};

module.exports = { isAdmin };
