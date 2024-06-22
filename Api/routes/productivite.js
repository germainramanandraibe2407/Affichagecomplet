const express = require('express');
const app = express();
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');

//erreur json nety
app.use (express.urlencoded({extended : false}));
// For parsing application/json
/*app.use(express.json());*/
 
// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'allooelcome_productivité'
});
                                            //create
    router.post('/add', function(req, res) {
  const data =req.body;
  console.log(data);
  let fiche= data.fiche;douchette=data.douchette;
aerateur=data.aerateur;robinet=data.robinet;led=data.led;projecteur=data.projecteur;
hublot=data.hublot;lampadaire=data.lampadaire;lel=data.lel;nom=data.nom
 connection.query('INSERT INTO productivités(nbrfiche,nbrdouchette,nbraerateur,nbrrobinet,nbrled,nbrprojecteur,nbrhublots,nbrlampadaire,nbrledetequivalentled,idpersonne)VALUES (?,?,?,?,?,?,?,?,?,(select idpersonne from personnes where personnes.prenompersonne=?))',[fiche,douchette,aerateur,robinet,led,projecteur,hublot,lampadaire,lel,nom], function(err, results) {
  if (err) {
    res.status(500).json({ message: 'erreur serveur' });
    console.log(err)
    
    return ;
  }
  return res.status(201).json({ message: 'productivité ajouté avec succès' });
       
});
    })
                             //read
 router.get('/read', function(req, res) {
  const sql = 'SELECT * FROM personnes join productivités on productivités.idpersonne=personnes.idpersonne'
  connection.query(sql, [], function(err, results) {
    if (err) throw err;
    res.send(results); 
  });
});

                              //update
  router.post('/update', function(req, res) {
  
  const data = req.body;

  let fiche = data.fiche;
  let douchette = data.douchette;
  let aerateur = data.aerateur;
  let robinet = data.robinet;
  let led = data.led;
  let projecteur = data.projecteur;
  let hublot = data.hublot;
  let lampadaire = data.lampadaire;
  let lel = data.lel;
  let id = data.idproductivité;

  connection.query(
    'UPDATE productivités SET  nbrfiche = COALESCE(?, nbrfiche), nbrdouchette = COALESCE(?, nbrdouchette),  nbraerateur = COALESCE(?, nbraerateur), nbrrobinet = COALESCE(?, nbrrobinet),nbrled = COALESCE(?, nbrled),nbrprojecteur = COALESCE(?, nbrprojecteur),nbrhublots = COALESCE(?, nbrhublots),nbrlampadaire = COALESCE(?, nbrlampadaire), nbrledetequivalentled = COALESCE(?, nbrledetequivalentled)WHERE    idproductivité = ?;',  [fiche, douchette, aerateur, robinet, led, projecteur, hublot, lampadaire, lel, id],
    function(err, results) {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.log(err);
        return;
      }
      res.status(200).json({ message: 'Productivité mise à jour avec succès' });
    }
  );
}); 
                //delete 
  router.post('/delete', function(req, res) {
    const data = req.body;

  let id = data.idproductivité;
  
  connection.query(
    'DELETE FROM productivités WHERE idproductivité = ?',
    [id],
    function(err, results) {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.log(err);
        return;
      }

      if (results.affectedRows === 0) {
        res.status(404).json({ message: 'Productivité non trouvée' });
        return;
      }

      res.status(200).json({ message: 'Productivité supprimée avec succès' });
    }
  );
}); 

module.exports = router;