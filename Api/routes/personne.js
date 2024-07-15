const express = require('express');
var app=express();
const bodyparser=require('body-parser');
const path=require('path');
const mysql = require('mysql');
const router = express.Router();


 
//ajout du middleware body-parser
app.use(bodyparser.json());    
 
//set upp public directory to serve static files
console.log(__dirname)
app.use(express.static('public'));
// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'allooelcome_productivité'
  });
  
// Se connecter à la base de données
connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données:', err);
      return;
    }
    console.log('Connexion à la base de données réussie');
  });
 
                                                          //create


  router.post('/add', function(req, res) {
    const data =req.body;
    let prenom = data.prenompersonne;

// Vérifier d'abord si le prénom n'existe pas dans la base de données
connection.query('SELECT COUNT(*) AS count FROM personnes WHERE prenompersonne = ?', [prenom], (err, result) => {
  if (err) {
    res.status(500).json({ message: 'Erreur serveur' });
    console.log(err);
    return;
  }

  if (result[0].count > 0) {
    // Le prénom existe déjà, renvoyer une erreur
    res.status(400).json({ message: 'Le prénom existe déjà dans la base de données.' });
    return;
  }

  // Le prénom n'existe pas, on peut l'insérer
  connection.query('INSERT INTO personnes (prenompersonne) VALUES (?)', [prenom], (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
      console.log(err);
      return;
    }
    res.status(201).json({ message: 'Ajout de personne effectué avec succès' });
  });
});
})

                                                        //read
 router.get('/read', function(req, res) {
    const sql = 'SELECT * FROM personnes'
    connection.query(sql, [], function(err, results) {
      if (err) throw err;
      res.send(results); 
    });
  });


                                                        //update
//modification
router.post('/edit', function(req, res) {
  const data = req.body;
  console.log(data);
  let prenom = data.prenompersonne;
  let id = data.idpersonne;

  // Vérifier d'abord si le nouveau prénom n'existe pas déjà dans la base de données
  connection.query('SELECT COUNT(*) AS count FROM personnes WHERE prenompersonne = ? AND idpersonne != ?', [prenom, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Erreur serveur' });
      console.log(err);
      return;
    }

    if (result[0].count > 0) {
      // Le prénom existe déjà pour une autre personne, renvoyer une erreur
      res.status(400).json({ message: 'Ce prénom existe déjà dans la base de données pour une autre personne.' });
      return;
    }

    // Le prénom n'existe pas ou correspond à la personne à modifier, on peut mettre à jour
    connection.query('UPDATE personnes SET prenompersonne = ? WHERE idpersonne = ?', [prenom, id], (err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.log(err);
        return;
      }
      res.status(201).json({ message: 'Modification de la personne effectuée avec succès' });
    });
  });
});

                                                    //delete

router.post('/delete', function(req, res) {
  const data =req.body;
    const sql = 'DELETE FROM personnes WHERE idpersonne=?'
    
    connection.query(sql, [data.idpersonne],(err, results) => {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.log(err);
        return;
      }
      else res.status(201).json({ message: 'Supression de la personne effectuée avec succès' });
    });
  }); 

  module.exports = router;