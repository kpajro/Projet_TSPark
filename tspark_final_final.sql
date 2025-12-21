-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : sam. 20 déc. 2025 à 14:17
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tspark`
--

-- --------------------------------------------------------

--
-- Structure de la table `accomplissement`
--

CREATE TABLE `accomplissement` (
  `user_id` int(11) NOT NULL,
  `recompense_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `accomplissement`
--

INSERT INTO `accomplissement` (`user_id`, `recompense_id`) VALUES
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `defis`
--

CREATE TABLE `defis` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `difficulte` int(11) NOT NULL,
  `recompense_id` int(11) DEFAULT NULL,
  `objectifs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`objectifs`)),
  `byUser` tinyint(1) NOT NULL DEFAULT 0,
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `defis`
--

INSERT INTO `defis` (`id`, `nom`, `difficulte`, `recompense_id`, `objectifs`, `byUser`, `debut`, `fin`) VALUES
(1, 'Défi Cardio 1', 1, 1, '{\"calories\": 300}', 0, '2024-02-01 08:00:00', '2026-02-07 08:00:00'),
(2, 'Défi Force 1', 2, 2, '{\"reps\": 50}', 0, '2024-02-02 09:00:00', '2026-02-08 09:00:00'),
(8, 'Défi Elite', 4, 8, '{\"temps\": 90}', 0, '2024-02-08 15:00:00', '2024-02-14 15:00:00'),
(9, 'Défi Marathon', 5, 9, '{\"distance\": 42195}', 0, '2024-02-09 16:00:00', '2024-02-15 16:00:00'),
(10, 'Défi Titan', 5, 10, '{\"reps\": 100}', 0, '2024-02-10 17:00:00', '2024-02-16 17:00:00'),
(14, 'Test Defi', 2, 2, NULL, 0, '2024-11-01 08:00:00', '2024-11-01 10:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `defis_exercices`
--

CREATE TABLE `defis_exercices` (
  `id` int(11) NOT NULL,
  `defi_id` int(11) NOT NULL,
  `exercice_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `defis_exercices`
--

INSERT INTO `defis_exercices` (`id`, `defi_id`, `exercice_id`) VALUES
(1, 1, 1),
(2, 1, 7),
(3, 2, 2),
(4, 2, 8),
(5, 8, 4),
(6, 9, 7),
(7, 9, NULL),
(8, 10, 2),
(9, 10, 9);

-- --------------------------------------------------------

--
-- Structure de la table `exercices`
--

CREATE TABLE `exercices` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `complementaire` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `exercices`
--

INSERT INTO `exercices` (`id`, `nom`, `description`, `complementaire`) VALUES
(1, 'Pompes', 'Travail des pectoraux.', 'Triceps'),
(2, 'Tractions', 'Travail du dos.', 'Biceps'),
(3, 'Squats', 'Travail des jambes.', 'Fentes'),
(4, 'Gainage', 'Renforcement du tronc.', 'Planche'),
(5, 'Burpees', 'Exercice complet.', 'Pompes'),
(6, 'Fentes', 'Travail des cuisses.', 'Squats'),
(7, 'Saut corde', 'Cardio.', 'Burpees'),
(8, 'Rowing', 'Dos et bras.', 'Tractions'),
(9, 'Développé couché', 'Pectoraux.', 'Haltères');

-- --------------------------------------------------------

--
-- Structure de la table `participationdefi`
--

CREATE TABLE `participationdefi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `defi_id` int(11) DEFAULT NULL,
  `seance_id` int(11) DEFAULT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `participationdefi`
--

INSERT INTO `participationdefi` (`id`, `user_id`, `defi_id`, `seance_id`, `status`) VALUES
(1, 2, 2, 8, 'completed'),
(2, 2, 2, 2, 'completed');

-- --------------------------------------------------------

--
-- Structure de la table `recompenses`
--

CREATE TABLE `recompenses` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `type` enum('badge','recompense') NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recompenses`
--

INSERT INTO `recompenses` (`id`, `nom`, `type`, `points`) VALUES
(1, 'Badge Bronze', 'badge', 10),
(2, 'Badge Argent', 'badge', 20),
(3, 'Badge Or', 'badge', 30),
(4, 'Récompense Mini', 'recompense', 5),
(5, 'Récompense Standard', 'recompense', 15),
(6, 'Récompense Premium', 'recompense', 25),
(7, 'Super Badge', 'badge', 40),
(8, 'Ultimate Badge', 'badge', 50),
(9, 'Boost XP', 'recompense', 35),
(10, 'Mega Reward', 'recompense', 45),
(11, 'Débutant Cardio', 'badge', 10);

-- --------------------------------------------------------

--
-- Structure de la table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(3, 'admin'),
(2, 'proprietaire'),
(1, 'user');

-- --------------------------------------------------------

--
-- Structure de la table `salledesport`
--

CREATE TABLE `salledesport` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `numtel` bigint(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `activites` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`activites`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `salledesport`
--

INSERT INTO `salledesport` (`id`, `nom`, `adresse`, `numtel`, `description`, `activites`) VALUES
(1, 'FitZone A', '10 Rue Alpha', 610203040, 'Salle moderne.', '[\"cardio\", \"muscu\"]'),
(2, 'FitZone B', '20 Rue Beta', 610203041, 'Grande salle.', '[\"yoga\", \"pilates\"]'),
(3, 'UrbanGym', '30 Rue Gamma', 610203042, 'Ouverte 24/24.', '[\"crossfit\", \"cardio\"]'),
(4, 'PowerClub', '40 Rue Delta', 610203043, 'Ambiance motivante.', '[\"muscu\"]'),
(5, 'ZenStudio', '50 Rue Epsilon', 610203044, 'Spécial bien-être.', '[\"yoga\"]'),
(6, 'MegaFit', '60 Rue Zeta', 610203045, 'Salle géante.', '[\"muscu\", \"cardio\"]'),
(7, 'SportHub', '70 Rue Eta', 610203046, 'Innovante.', '[\"crossfit\"]'),
(8, 'MaxFitness', '80 Rue Theta', 610203047, 'Pour tous niveaux.', '[\"cardio\"]'),
(9, 'PulseGym', '90 Rue Iota', 610203048, 'Sport intensif.', '[\"muscu\", \"crossfit\"]'),
(10, 'VitalCenter', '100 Rue Kappa', 610203049, 'Complet.', '[\"yoga\", \"muscu\"]');

-- --------------------------------------------------------

--
-- Structure de la table `salleentrainement`
--

CREATE TABLE `salleentrainement` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `capacite` int(11) NOT NULL,
  `equipements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipements`)),
  `responsable_id` int(11) NOT NULL,
  `salle_de_sport_id` int(11) NOT NULL,
  `accepted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `salleentrainement`
--

INSERT INTO `salleentrainement` (`id`, `nom`, `capacite`, `equipements`, `responsable_id`, `salle_de_sport_id`, `accepted`) VALUES
(8, 'Salle H', 12, '[\"cordes\"]', 8, 8, 0),
(9, 'Salle I', 16, '[\"machines\", \"tapis\"]', 9, 9, 0),
(10, 'Super Salle de Sport', 15, '[\"test\"]', 2, 3, 0),
(13, 'Super Salle de Sport', 0, '[\"muscu\",\"cardio\"]', 2, 3, 0);

-- --------------------------------------------------------

--
-- Structure de la table `seances`
--

CREATE TABLE `seances` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `calories` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `temps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `seances`
--

INSERT INTO `seances` (`id`, `user_id`, `calories`, `date`, `temps`) VALUES
(1, 1, 300, '2024-01-05 10:00:00', 45),
(2, 2, 450, '2024-01-06 11:00:00', 60),
(8, 2, 420, '2024-01-12 12:00:00', 55),
(9, 9, 530, '2024-01-13 15:00:00', 65),
(10, 10, 300, '2024-01-14 16:30:00', 35),
(11, 2, 1000, '2025-12-10 22:50:59', 160),
(12, 1, 300, '2023-04-10 12:00:00', 60);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT 1,
  `actif` tinyint(1) NOT NULL DEFAULT 1,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `actif`, `points`) VALUES
(1, 'Alice Martin', '', '', 1, 1, 0),
(2, 'Bob Dupont', '', '', 1, 1, 0),
(8, 'Hugo Laurent', '', '', 1, 1, 0),
(9, 'Isabelle Petit', '', '', 2, 1, 0),
(10, 'Julien Caron', '', '', 1, 1, 0),
(22, 'Jean', 'blublu@gmail.com', '$2b$10$hULJqFszJzkDayd4YbFhvu1IlkUcIDxa/Pw8MzqO9iZAen7zd5/3y', 1, 1, 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `accomplissement`
--
ALTER TABLE `accomplissement`
  ADD PRIMARY KEY (`user_id`,`recompense_id`),
  ADD KEY `accomplissement_ibfk_1` (`recompense_id`),
  ADD KEY `accomplissement_ibfk_2` (`user_id`);

--
-- Index pour la table `defis`
--
ALTER TABLE `defis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recompense_id` (`recompense_id`);

--
-- Index pour la table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `defis_exercices_ibfk_1` (`defi_id`),
  ADD KEY `defis_exercices_ibfk_2` (`exercice_id`);

--
-- Index pour la table `exercices`
--
ALTER TABLE `exercices`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `participationdefi`
--
ALTER TABLE `participationdefi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participationdefi_ibfk_1` (`user_id`),
  ADD KEY `participationdefi_ibfk_2` (`defi_id`),
  ADD KEY `participationdefi_ibfk_3` (`seance_id`);

--
-- Index pour la table `recompenses`
--
ALTER TABLE `recompenses`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `salledesport`
--
ALTER TABLE `salledesport`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salle_de_sport_id` (`salle_de_sport_id`),
  ADD KEY `salleentrainement_ibfk_1` (`responsable_id`);

--
-- Index pour la table `seances`
--
ALTER TABLE `seances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seances_ibfk_1` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_ibfk_1` (`role_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `participationdefi`
--
ALTER TABLE `participationdefi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `recompenses`
--
ALTER TABLE `recompenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `salledesport`
--
ALTER TABLE `salledesport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `seances`
--
ALTER TABLE `seances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `accomplissement`
--
ALTER TABLE `accomplissement`
  ADD CONSTRAINT `accomplissement_ibfk_1` FOREIGN KEY (`recompense_id`) REFERENCES `recompenses` (`id`),
  ADD CONSTRAINT `accomplissement_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `defis`
--
ALTER TABLE `defis`
  ADD CONSTRAINT `defis_ibfk_1` FOREIGN KEY (`recompense_id`) REFERENCES `recompenses` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  ADD CONSTRAINT `defis_exercices_ibfk_1` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`),
  ADD CONSTRAINT `defis_exercices_ibfk_2` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `participationdefi`
--
ALTER TABLE `participationdefi`
  ADD CONSTRAINT `participationdefi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `participationdefi_ibfk_2` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`),
  ADD CONSTRAINT `participationdefi_ibfk_3` FOREIGN KEY (`seance_id`) REFERENCES `seances` (`id`) ON UPDATE CASCADE;

--
-- Contraintes pour la table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  ADD CONSTRAINT `salleentrainement_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `salleentrainement_ibfk_2` FOREIGN KEY (`salle_de_sport_id`) REFERENCES `salledesport` (`id`);

--
-- Contraintes pour la table `seances`
--
ALTER TABLE `seances`
  ADD CONSTRAINT `seances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
