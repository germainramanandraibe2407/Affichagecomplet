const express = require('express');
const app = express();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const cors = require('cors');
app.use(cors());

//erreur json nety
app.use (express.urlencoded({extended : true}));
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'allooelcome_productivité'
  });

  // Middleware pour parser les requêtes en JSON
app.use(express.json());

// Middleware pour gérer la session
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));
// Route pour la racine de l'application
app.get('/', function(req, res) {
  res.send('Bienvenue sur l\'API');
});

// Routes pour l'API personne
const personneRoutes = require('./routes/personne');
app.use('/api/personne', personneRoutes);


const productivitéRoutes = require('./routes/productivite');
app.use('/api/productivite', productivitéRoutes);  


const produitsRoutes = require('./routes/produits');
app.use('/api/produits', produitsRoutes);  

  // Démarrage du serveur
  const PORT = 9000; // Choisissez le port que vous souhaitez utiliser

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
  });
  /* Routes pour l'API de Ajout
const AjoutMaterielsRoutes = require('./routes/ajoutmateriel');
app.use('/api/ajoutmateriel', AjoutMaterielsRoutes);
*/
 

