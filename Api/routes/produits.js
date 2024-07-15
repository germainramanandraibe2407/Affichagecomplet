const express = require("express");
var app = express();
const bodyparser = require("body-parser");
const path = require("path");
const mysql = require("mysql");
const router = express.Router();

//ajout du middleware body-parser
app.use(bodyparser.json());

//set upp public directory to serve static files
console.log(__dirname);
app.use(express.static("public"));
// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "allooelcome_productivité",
});

// Se connecter à la base de données
connection.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connexion à la base de données réussie");
});

//read
router.get("/read", function (req, res) {
  const sql = "SELECT * FROM produits";
  connection.query(sql, [], function (err, results) {
    if (err) throw err;
    res.send(results);
  });
});

//update

router.post("/edit", function (req, res) {
  const data = req.body;
  console.log(data);
  let douchette = data.Eqdouchette,
    aerateur = data.Eqaerateur,
    robinet = data.Eqrobinet,
    projecteur = data.Eqprojecteur,
    hublot = data.Eqhublot,
    lampadaire = data.Eqlampadaire;

  connection.query(
    "UPDATE produits SET Eqdouchette=?,Eqaerateur=?,Eqrobinet=?,Eqprojecteur=?,Eqhublot=?,Eqlampadaire=?  WHERE 1 ",
    [douchette, aerateur, robinet, projecteur, hublot, lampadaire],
    (err, results) => {
      if (err) {
        res.status(500).json({ message: "Erreur serveur" });
        console.log(err);
        return;
      }
      res.status(201).json({ message: "Modification equivalence en led effectuée avec succès" });
    }
  );
});

//delete

router.post("/remove", function (req, res) {
  connection.query(
    "UPDATE produits SET Eqdouchette=0,Eqaerateur=0,Eqrobinet=0,Eqprojecteur=0,Eqhublot=0,Eqlampadaire=0  WHERE 1 ",
    function (err, results) {
      if (err) {
        res.status(500).json({ message: "Erreur serveur" });
        console.log(err);
        return;
      }
      res
        .status(200)
        .json({ message: "equivalence en led mise à jour a 0 avec succès" });
    }
  );
});
module.exports = router;
