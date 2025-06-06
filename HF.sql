-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db.3wa.io
-- Généré le : ven. 06 juin 2025 à 15:02
-- Version du serveur :  5.7.33-0ubuntu0.18.04.1-log
-- Version de PHP : 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `maximebelard_HaveFuun`
--

-- --------------------------------------------------------

--
-- Structure de la table `Articles`
--

CREATE TABLE `Articles` (
  `ID_article` smallint(6) NOT NULL,
  `name` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tags` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `avatar` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  `dt_publication` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Comments`
--

CREATE TABLE `Comments` (
  `ID_comment` smallint(6) NOT NULL,
  `ID_user` smallint(6) NOT NULL,
  `ID_article` smallint(6) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Form`
--

CREATE TABLE `Form` (
  `ID_form` smallint(6) NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `question` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topicA` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topicB` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `topicC` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `avatar` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Form_result`
--

CREATE TABLE `Form_result` (
  `ID_form_result` smallint(6) NOT NULL,
  `ID_form` smallint(6) NOT NULL,
  `result` tinyint(4) NOT NULL,
  `ID_user` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Role`
--

CREATE TABLE `Role` (
  `ID_role` tinyint(4) NOT NULL,
  `name` enum('admin','users','moderator') CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `Role`
--

INSERT INTO `Role` (`ID_role`, `name`) VALUES
(1, 'admin'),
(2, 'moderator'),
(3, 'users');

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `ID` smallint(6) NOT NULL,
  `pseudo` varchar(60) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `role` tinyint(4) NOT NULL DEFAULT '3',
  `has_accepted_terms` tinyint(1) NOT NULL DEFAULT '1',
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `avatar` varchar(80) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`ID_article`);

--
-- Index pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`ID_comment`),
  ADD KEY `ID_user` (`ID_user`),
  ADD KEY `ID_article` (`ID_article`);

--
-- Index pour la table `Form`
--
ALTER TABLE `Form`
  ADD PRIMARY KEY (`ID_form`);

--
-- Index pour la table `Form_result`
--
ALTER TABLE `Form_result`
  ADD PRIMARY KEY (`ID_form_result`),
  ADD KEY `ID_user` (`ID_user`),
  ADD KEY `ID_form` (`ID_form`);

--
-- Index pour la table `Role`
--
ALTER TABLE `Role`
  ADD PRIMARY KEY (`ID_role`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `ID_article` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `ID_comment` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Form`
--
ALTER TABLE `Form`
  MODIFY `ID_form` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `Form_result`
--
ALTER TABLE `Form_result`
  MODIFY `ID_form_result` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `Role`
--
ALTER TABLE `Role`
  MODIFY `ID_role` tinyint(4) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `ID` smallint(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `fk_comments_article` FOREIGN KEY (`ID_article`) REFERENCES `Articles` (`ID_article`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `Form_result`
--
ALTER TABLE `Form_result`
  ADD CONSTRAINT `fk_form_result_form` FOREIGN KEY (`ID_form`) REFERENCES `Form` (`ID_form`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_form_result_user` FOREIGN KEY (`ID_user`) REFERENCES `Users` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
