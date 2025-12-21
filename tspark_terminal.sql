-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 21 déc. 2025 à 16:21
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
(2, 10);

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
  `byUser` tinyint(1) DEFAULT 0,
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
(10, 'Défi Titan', 5, 10, '{\"reps\":100}', 0, '2024-02-10 17:00:00', '2024-02-16 17:00:00'),
(14, 'Test Defi', 2, 2, NULL, 0, '2024-11-01 08:00:00', '2024-11-01 10:00:00'),
(15, 'Test Defi', 2, 2, '\"{reps: 40}\"', 1, '2024-11-01 08:00:00', '2024-11-01 10:00:00'),
(19, 'Défi des Grandes Cités', 5, 2, '{\"Distance\":30000}', 1, '2023-04-01 00:00:00', '2024-04-30 23:59:59');

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
(7, 9, 4),
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
(10, 2, 10, 13, 'completed');

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
(11, 'Débutant Cardio', 'badge', 10),
(12, 'Débutant Cardio', 'badge', 10),
(13, 'Débutant Cardio', 'recompense', 10),
(14, 'Débutant Cardio', 'recompense', 10);

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
  `responsable_id` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  `equipements` varchar(100) DEFAULT NULL,
  `accepted` int(11) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `numtel` bigint(20) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `activites` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`activites`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `salledesport`
--

INSERT INTO `salledesport` (`id`, `nom`, `responsable_id`, `capacite`, `equipements`, `accepted`, `adresse`, `numtel`, `description`, `activites`) VALUES
(1, 'FitZone A', NULL, 30, '[\"gants\",\"trucs\"]', 1, '10 Rue Alpha', 610203040, 'Salle moderne.', '[\"cardio\", \"muscu\"]'),
(2, 'FitZone B', NULL, 40, '', 0, '20 Rue Beta', 610203041, 'Grande salle.', '[\"yoga\", \"pilates\"]'),
(3, 'UrbanGym', NULL, 15, '', 0, '30 Rue Gamma', 610203042, 'Ouverte 24/24.', '[\"crossfit\", \"cardio\"]'),
(4, 'PowerClub', NULL, 24, '', 0, '40 Rue Delta', 610203043, 'Ambiance motivante.', '[\"muscu\"]'),
(5, 'ZenStudio', NULL, 54, '', 0, '50 Rue Epsilon', 610203044, 'Spécial bien-être.', '[\"yoga\"]'),
(6, 'MegaFit', NULL, 53, '', 1, '60 Rue Zeta', 610203045, 'Salle géante.', '[\"muscu\", \"cardio\"]'),
(11, 'Super Salle de Sport', 2, 10, '[\"muscu\",\"cardio\"]', 1, NULL, NULL, 'salle de sport!!!?!!!', NULL),
(17, 'Super Salle', 2, 20, '[\"muscu\",\"cardio\"]', 0, NULL, NULL, 'salle de sport?', NULL),
(18, 'Super Salle', 2, 20, '[\"muscu\",\"cardio\"]', 0, '123 Rue des Sports', 123456789, 'salle de sport?', '[\"test\",\"test2\"]'),
(19, 'test', 2, 123, '[\"troncs\"]', 1, 'null', 10101010, 'super', '[\"super\",\"activites\"]');

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
(13, 2, 420, '2025-12-21 14:44:43', 55),
(15, 2, 300, '2023-04-10 12:00:00', 60);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(80) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` int(11) NOT NULL,
  `actif` tinyint(1) NOT NULL,
  `points` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role_id`, `actif`, `points`) VALUES
(2, 'Jeremy', 'jeremy@example.com', '$2b$10$a.tv7yv9hKhLe6ob4tKXcOD4ueKjqaXAOg8kjehrYynivxRQOzllS', 3, 1, 140),
(5, 'testeur', 'testeur@gmail.com', '$2b$10$Nsfk/iKDrtj.0Q2unYfmvuaMmhajmgzN25c5pdGa/6R5/.RvDSuXm', 1, 1, 0);

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `responsable_id` (`responsable_id`);

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
  ADD KEY `users_ibfk_1` (`role_id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `participationdefi`
--
ALTER TABLE `participationdefi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `recompenses`
--
ALTER TABLE `recompenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `salledesport`
--
ALTER TABLE `salledesport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `seances`
--
ALTER TABLE `seances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `accomplissement`
--
ALTER TABLE `accomplissement`
  ADD CONSTRAINT `accomplissement_ibfk_1` FOREIGN KEY (`recompense_id`) REFERENCES `recompenses` (`id`);

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
  ADD CONSTRAINT `participationdefi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participationdefi_ibfk_2` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`),
  ADD CONSTRAINT `participationdefi_ibfk_3` FOREIGN KEY (`seance_id`) REFERENCES `seances` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `salledesport`
--
ALTER TABLE `salledesport`
  ADD CONSTRAINT `responsable_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;

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
