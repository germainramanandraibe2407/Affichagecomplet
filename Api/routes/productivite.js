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
  let nom=data.nom
  connection.query(`
    INSERT INTO productivités (
      nbrfiche, nbrdouchette, nbraerateur, nbrrobinet, nbrled, 
      nbrprojecteur, nbrhublots, nbrlampadaire, nbrledetequivalentled, idpersonne
    )
    VALUES (
      ?,?,?,?,?,?,?,?,?, (SELECT idpersonne FROM personnes WHERE personnes.prenompersonne = ?)
    )`, 
    [0, 0, 0, 0, 0, 0, 0, 0, 0, nom],
    function(err, results) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Erreur serveur' });
      }
      return res.status(201).json({ message: 'Productivité ajoutée avec succès' });
    }
  );
    })
                             //read
 router.get('/read', function(req, res) {
  const sql = 'SELECT * FROM personnes join productivités on productivités.idpersonne=personnes.idpersonne order by productivités.nbrledetequivalentled desc'
  connection.query(sql, [], function(err, results) {
    if (err) throw err;
    res.send(results); 
  });

});

                              //update
  router.post('/update', function(req, res) {

          //read 
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

       
           
      //   console.log(parseFloat(douchette*Eqdouchette  +Eqaerateur*aerateur +Eqrobinet*robinet+Eqprojecteur* projecteur +Eqhublot *hublot +Eqlampadaire * lampadaire))
     
            connection.query(
              'UPDATE productivités SET  nbrfiche = COALESCE(?, nbrfiche), nbrdouchette = COALESCE(?, nbrdouchette),  nbraerateur = COALESCE(?, nbraerateur), nbrrobinet = COALESCE(?, nbrrobinet),nbrled = COALESCE(?, nbrled),nbrprojecteur = COALESCE(?, nbrprojecteur),nbrhublots = COALESCE(?, nbrhublots),nbrlampadaire = COALESCE(?, nbrlampadaire), nbrledetequivalentled = COALESCE(?, nbrledetequivalentled)WHERE    idproductivité = ?;',  [fiche, douchette, aerateur, robinet, led, projecteur, hublot, lampadaire, lel, id],
              function(err, results) {
                if (err) {
                  res.status(500).json({ message: 'Erreur serveur' });
                  console.log(err);
                
                }
                res.status(200).json({ message: 'Productivité mise à jour avec succès' })

                  //recup val actuel
                const sql = 'SELECT * FROM personnes join productivités on productivités.idpersonne=personnes.idpersonne where productivités.idproductivité=?'
                connection.query(sql, [id], function(err, result) {
                  if (err) throw err;
                  console.log(result); 
                  const productivites = result[0],
                  nbrdouchette=productivites.nbrdouchette,
                  nbraerateur=productivites.nbraerateur,
                  nbrrobinet=productivites.nbrrobinet,
                  nbrled=productivites.nbrled,
                  nbrprojecteur=productivites.nbrprojecteur,
                  nbrhublot=productivites.nbrhublots,
                  nbrlampadaire=productivites.nbrlampadaire

               
                    const sql = "SELECT * FROM produits";
                    connection.query(sql, [], function (ero, resu) {
                      if (ero) throw ero;
                      const produit = resu[0];
                      const Eqdouchette = produit.Eqdouchette;
                      const Eqaerateur = produit.Eqaerateur;
                      const Eqrobinet = produit.Eqrobinet;
                      const Eqprojecteur = produit.Eqprojecteur;
                      const Eqhublot = produit.Eqhublot;
                      const Eqlampadaire = produit.Eqlampadaire;
                      
                      const Equivled=parseFloat(nbrdouchette*Eqdouchette  +Eqaerateur*nbraerateur +Eqrobinet*nbrrobinet+nbrled + Eqprojecteur* nbrprojecteur +Eqhublot *nbrhublot +Eqlampadaire * nbrlampadaire)

                      console.log(Equivled)

                        connection.query(
                           'UPDATE productivités SET nbrledetequivalentled = COALESCE(?, nbrledetequivalentled)WHERE    idproductivité = ?;',
                             [Equivled,id],
                              function(err, res) {
                                if (err) {
                                  res.status(500).json({ message: 'Erreur serveur' });
                                  console.log(err);
                                
                                }
                               // re.status(200).json({ message: 'Productivité mise à jour avec succès' })
                            })

                  });
                  
            //  console.log(lampadaire)
                })
               
              }  
              
            )
           
          
               
        
  
 
   // console.log(data)
  
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


router.post('/remove', function(req, res) {
  connection.query(
    'UPDATE productivités SET nbrfiche = 0, nbrdouchette = 0, nbraerateur = 0, nbrrobinet = 0, nbrled = 0, nbrprojecteur = 0, nbrhublots = 0, nbrlampadaire = 0, nbrledetequivalentled = 0;',
    function(err, results) {
      if (err) {
        res.status(500).json({ message: 'Erreur serveur' });
        console.log(err);
        return;
      }
      res.status(200).json({ message: 'Productivité mise à jour a 0 avec succès' });
    }
    
  );
});

module.exports = router;