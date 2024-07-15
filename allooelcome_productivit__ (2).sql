-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 15 juil. 2024 à 14:02
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
CREATE DATABASE IF NOT EXISTS `allooelcome_productivité` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `allooelcome_productivité`;

-- --------------------------------------------------------

--
-- Structure de la table `personnes`
--

DROP TABLE IF EXISTS `personnes`;
CREATE TABLE IF NOT EXISTS `personnes` (
  `idpersonne` int(11) NOT NULL AUTO_INCREMENT,
  `prenompersonne` varchar(50) NOT NULL,
  PRIMARY KEY (`idpersonne`)
) ENGINE=MyISAM AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `personnes`
--

INSERT INTO `personnes` (`idpersonne`, `prenompersonne`) VALUES
(2, 'Nitia'),
(6, 'Garry'),
(37, 'SONIA'),
(12, 'Fahendrena'),
(13, 'Sitraka'),
(15, 'Tahinasoa'),
(16, 'Kanto'),
(17, 'Gracia'),
(19, 'Nathalino'),
(20, 'Julie'),
(21, 'Lafatra'),
(22, 'Ony Tatamo'),
(23, 'Manda'),
(25, 'Henintsoa'),
(26, 'Miora Rpk'),
(27, 'Mirado'),
(39, 'safidy'),
(33, 'iopop'),
(41, 'azerty');

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
  `nbrledetequivalentled` float NOT NULL,
  `idpersonne` int(11) NOT NULL,
  PRIMARY KEY (`idproductivité`)
) ENGINE=MyISAM AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `productivités`
--

INSERT INTO `productivités` (`idproductivité`, `nbrfiche`, `nbrdouchette`, `nbraerateur`, `nbrrobinet`, `nbrled`, `nbrprojecteur`, `nbrhublots`, `nbrlampadaire`, `nbrledetequivalentled`, `idpersonne`) VALUES
(48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7),
(69, 0, 0, 0, 0, 0, 0, 0, 0, 0, 33),
(64, 0, 3, 0, 0, 0, 0, 0, 0, 3, 6),
(63, 0, 0, 0, 0, 0, 0, 0, 0, 0, 12),
(67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20),
(49, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7),
(68, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16),
(66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 25),
(65, 0, 5, 6, 0, 0, 0, 0, 0, 11, 17),
(70, 0, 0, 0, 0, 0, 0, 0, 0, 0, 19);

-- --------------------------------------------------------

--
-- Structure de la table `produits`
--

DROP TABLE IF EXISTS `produits`;
CREATE TABLE IF NOT EXISTS `produits` (
  `idproduit` int(11) NOT NULL,
  `Eqdouchette` float DEFAULT NULL,
  `Eqaerateur` float DEFAULT NULL,
  `Eqrobinet` float DEFAULT NULL,
  `Eqprojecteur` float DEFAULT NULL,
  `Eqhublot` float DEFAULT NULL,
  `Eqlampadaire` float DEFAULT NULL,
  UNIQUE KEY `idproduit` (`idproduit`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `produits`
--

INSERT INTO `produits` (`idproduit`, `Eqdouchette`, `Eqaerateur`, `Eqrobinet`, `Eqprojecteur`, `Eqhublot`, `Eqlampadaire`) VALUES
(2, 1, 1, 1, 1, 1, 1);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
