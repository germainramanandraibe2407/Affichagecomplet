-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  sam. 22 juin 2024 à 11:32
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `allooelcome_productivité`
--

-- --------------------------------------------------------

--
-- Structure de la table `fiches`
--

DROP TABLE IF EXISTS `fiches`;
CREATE TABLE IF NOT EXISTS `fiches` (
  `idfiche` int(11) NOT NULL AUTO_INCREMENT,
  `idpersonne` int(10) NOT NULL,
  `idproductivité` int(11) NOT NULL,
  PRIMARY KEY (`idfiche`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `personnes`
--

DROP TABLE IF EXISTS `personnes`;
CREATE TABLE IF NOT EXISTS `personnes` (
  `idpersonne` int(11) NOT NULL AUTO_INCREMENT,
  `prenompersonne` varchar(50) NOT NULL,
  PRIMARY KEY (`idpersonne`)
) ENGINE=MyISAM AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `personnes`
--

INSERT INTO `personnes` (`idpersonne`, `prenompersonne`) VALUES
(1, 'Miora2'),
(2, 'Nitia'),
(7, 'Tatamo'),
(6, 'Garry'),
(8, 'Sonia'),
(12, 'Fahendrena'),
(13, 'Sitraka'),
(14, 'Erick'),
(15, 'Tahinasoa'),
(16, 'Kanto'),
(17, 'Gracia'),
(18, 'Brunia'),
(19, 'Nathalino'),
(20, 'Julie'),
(21, 'Lafatra'),
(22, 'Ony Tatamo'),
(23, 'Manda'),
(24, 'Edouarda'),
(25, 'Henintsoa'),
(26, 'Miora Rp'),
(27, 'Mirado'),
(28, 'Diary');

-- --------------------------------------------------------

--
-- Structure de la table `productivités`
--

DROP TABLE IF EXISTS `productivités`;
CREATE TABLE IF NOT EXISTS `productivités` (
  `idproductivité` int(11) NOT NULL AUTO_INCREMENT,
  `nbrfiche` int(11) NOT NULL,
  `nbrdouchette` int(10) NOT NULL,
  `nbraerateur` int(10) NOT NULL,
  `nbrrobinet` int(11) NOT NULL,
  `nbrled` int(11) NOT NULL,
  `nbrprojecteur` int(11) NOT NULL,
  `nbrhublots` int(11) NOT NULL,
  `nbrlampadaire` int(11) NOT NULL,
  `nbrledetequivalentled` int(11) NOT NULL,
  `idpersonne` int(11) NOT NULL,
  PRIMARY KEY (`idproductivité`)
) ENGINE=MyISAM AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `productivités`
--

INSERT INTO `productivités` (`idproductivité`, `nbrfiche`, `nbrdouchette`, `nbraerateur`, `nbrrobinet`, `nbrled`, `nbrprojecteur`, `nbrhublots`, `nbrlampadaire`, `nbrledetequivalentled`, `idpersonne`) VALUES
(7, 1, 1, 111, 1, 1, 1, 1, 1, 1, 1),
(8, 1, 1, 1, 1, 1, 1, 1, 1, 1, 12),
(16, 1, 1, 1, 1, 1, 1, 1, 1, 1, 17),
(10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 13),
(11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2),
(12, 1, 1, 1, 1, 1, 1, 1, 1, 1, 7),
(13, 1, 1, 1, 1, 1, 1, 1, 1, 1, 6),
(14, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8),
(15, 1, 1, 1, 1, 1, 1, 1, 1, 1, 15),
(17, 1, 1, 1, 1, 1, 1, 1, 1, 1, 18),
(18, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20),
(19, 1, 1, 1, 1, 1, 1, 1, 1, 1, 23),
(20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 28),
(21, 1, 1, 1, 1, 1, 1, 1, 1, 1, 26);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `idproduit` int(11) NOT NULL AUTO_INCREMENT,
  UNIQUE KEY `idproduit` (`idproduit`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
