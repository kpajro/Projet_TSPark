-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2025 at 01:34 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tspark`
--

-- --------------------------------------------------------

--
-- Table structure for table `defis`
--

CREATE TABLE `defis` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `difficulte` int(11) NOT NULL,
  `recompense_id` int(11) DEFAULT NULL,
  `seance_id` int(11) DEFAULT NULL,
  `objectifs` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`objectifs`)),
  `debut` datetime NOT NULL,
  `fin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defis`
--

INSERT INTO `defis` (`id`, `nom`, `difficulte`, `recompense_id`, `seance_id`, `objectifs`, `debut`, `fin`) VALUES
(1, 'Défi Cardio 1', 1, 1, 1, '{\"calories\": 300}', '2024-02-01 08:00:00', '2024-02-07 08:00:00'),
(2, 'Défi Force 1', 2, 2, 2, '{\"reps\": 50}', '2024-02-02 09:00:00', '2024-02-08 09:00:00'),
(3, 'Défi Endurance', 3, 3, 3, '{\"temps\": 60}', '2024-02-03 10:00:00', '2024-02-09 10:00:00'),
(4, 'Défi Sprint', 1, 4, 4, '{\"distance\": 1000}', '2024-02-04 11:00:00', '2024-02-10 11:00:00'),
(5, 'Défi Puissance', 4, 5, 5, '{\"poids\": 100}', '2024-02-05 12:00:00', '2024-02-11 12:00:00'),
(6, 'Défi Agilité', 2, 6, 6, '{\"reps\": 30}', '2024-02-06 13:00:00', '2024-02-12 13:00:00'),
(7, 'Défi Ultra', 5, 7, 7, '{\"calories\": 700}', '2024-02-07 14:00:00', '2024-02-13 14:00:00'),
(8, 'Défi Elite', 4, 8, 8, '{\"temps\": 90}', '2024-02-08 15:00:00', '2024-02-14 15:00:00'),
(9, 'Défi Marathon', 5, 9, 9, '{\"distance\": 42195}', '2024-02-09 16:00:00', '2024-02-15 16:00:00'),
(10, 'Défi Titan', 5, 10, 10, '{\"reps\": 100}', '2024-02-10 17:00:00', '2024-02-16 17:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `defis_exercices`
--

CREATE TABLE `defis_exercices` (
  `defi_id` int(11) NOT NULL,
  `exercice_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `defis_exercices`
--

INSERT INTO `defis_exercices` (`defi_id`, `exercice_id`) VALUES
(1, 1),
(1, 7),
(2, 2),
(2, 8),
(3, 3),
(3, 4),
(4, 5),
(5, 3),
(5, 9),
(6, 6),
(7, 1),
(7, 5),
(8, 4),
(9, 7),
(9, 10),
(10, 2),
(10, 9);

-- --------------------------------------------------------

--
-- Table structure for table `exercices`
--

CREATE TABLE `exercices` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `complementaire` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exercices`
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
(9, 'Développé couché', 'Pectoraux.', 'Haltères'),
(10, 'Crunchs', 'Abdominaux.', 'Gainage');

-- --------------------------------------------------------

--
-- Table structure for table `participationdefi`
--

CREATE TABLE `participationdefi` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `defi_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participationdefi`
--

INSERT INTO `participationdefi` (`id`, `user_id`, `defi_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 6, 6),
(7, 7, 7),
(8, 8, 8),
(9, 9, 9),
(10, 10, 10);

-- --------------------------------------------------------

--
-- Table structure for table `recompenses`
--

CREATE TABLE `recompenses` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `type` enum('badge','recompense') NOT NULL,
  `int_value` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `recompenses`
--

INSERT INTO `recompenses` (`id`, `nom`, `type`, `int_value`) VALUES
(1, 'Badge Bronze', 'badge', 10),
(2, 'Badge Argent', 'badge', 20),
(3, 'Badge Or', 'badge', 30),
(4, 'Récompense Mini', 'recompense', 5),
(5, 'Récompense Standard', 'recompense', 15),
(6, 'Récompense Premium', 'recompense', 25),
(7, 'Super Badge', 'badge', 40),
(8, 'Ultimate Badge', 'badge', 50),
(9, 'Boost XP', 'recompense', 35),
(10, 'Mega Reward', 'recompense', 45);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(3, 'admin'),
(2, 'proprietaire'),
(1, 'user');

-- --------------------------------------------------------

--
-- Table structure for table `salledesport`
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
-- Dumping data for table `salledesport`
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
-- Table structure for table `salleentrainement`
--

CREATE TABLE `salleentrainement` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `capacite` int(11) NOT NULL,
  `equipements` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`equipements`)),
  `responsable_id` int(11) NOT NULL,
  `salle_de_sport_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `salleentrainement`
--

INSERT INTO `salleentrainement` (`id`, `nom`, `capacite`, `equipements`, `responsable_id`, `salle_de_sport_id`) VALUES
(3, 'Salle ABCD', 4, '[\"aucun\",\"quelquechose\"]', 4, 2),
(4, 'Salle D', 30, '[\"tapis\", \"machines\"]', 4, 4),
(5, 'Salle E', 18, '[\"kettlebell\", \"poids\"]', 5, 5),
(6, 'Salle F', 22, '[\"haltères\", \"barres\"]', 6, 6),
(7, 'Salle G', 28, '[\"tapis\", \"velo\"]', 7, 7),
(8, 'Salle H', 12, '[\"cordes\"]', 8, 8),
(9, 'Salle I', 16, '[\"machines\", \"tapis\"]', 9, 9),
(10, 'Salle J', 24, '[\"halteres\", \"rameur\"]', 10, 10),
(11, 'Salle cardio', 20, '[\"tapis\",\"vélo\",\"rameur\"]', 3, 1),
(12, 'Salle muscu', 10, '[\"machine à cable\",\"poids lourds\"]', 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `seances`
--

CREATE TABLE `seances` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `calories` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `temps` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seances`
--

INSERT INTO `seances` (`id`, `user_id`, `calories`, `date`, `temps`) VALUES
(1, 1, 300, '2024-01-05 10:00:00', 45),
(2, 2, 450, '2024-01-06 11:00:00', 60),
(3, 3, 500, '2024-01-07 09:45:00', 40),
(4, 4, 350, '2024-01-08 08:30:00', 50),
(5, 5, 600, '2024-01-09 17:00:00', 70),
(6, 6, 250, '2024-01-10 19:00:00', 30),
(7, 7, 700, '2024-01-11 14:00:00', 75),
(8, 8, 420, '2024-01-12 12:00:00', 55),
(9, 9, 530, '2024-01-13 15:00:00', 65),
(10, 10, 300, '2024-01-14 16:30:00', 35);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `role_id` int(11) NOT NULL,
  `actif` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role_id`, `actif`) VALUES
(1, 'Alice Martin', 1, 1),
(2, 'Bob Dupont', 1, 1),
(3, 'Claire Leroy', 2, 1),
(4, 'David Moreau', 1, 1),
(5, 'Eva Bernard', 2, 1),
(6, 'Franck Simon', 1, 0),
(7, 'Gaelle Roche', 3, 1),
(8, 'Hugo Laurent', 1, 1),
(9, 'Isabelle Petit', 2, 1),
(10, 'Julien Caron', 1, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `defis`
--
ALTER TABLE `defis`
  ADD PRIMARY KEY (`id`),
  ADD KEY `recompense_id` (`recompense_id`),
  ADD KEY `seance_id` (`seance_id`);

--
-- Indexes for table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  ADD PRIMARY KEY (`defi_id`,`exercice_id`),
  ADD KEY `exercice_id` (`exercice_id`);

--
-- Indexes for table `exercices`
--
ALTER TABLE `exercices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `participationdefi`
--
ALTER TABLE `participationdefi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `defi_id` (`defi_id`);

--
-- Indexes for table `recompenses`
--
ALTER TABLE `recompenses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `salledesport`
--
ALTER TABLE `salledesport`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `responsable_id` (`responsable_id`),
  ADD KEY `salle_de_sport_id` (`salle_de_sport_id`);

--
-- Indexes for table `seances`
--
ALTER TABLE `seances`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `defis`
--
ALTER TABLE `defis`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `exercices`
--
ALTER TABLE `exercices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `participationdefi`
--
ALTER TABLE `participationdefi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `recompenses`
--
ALTER TABLE `recompenses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `salledesport`
--
ALTER TABLE `salledesport`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `seances`
--
ALTER TABLE `seances`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `defis`
--
ALTER TABLE `defis`
  ADD CONSTRAINT `defis_ibfk_1` FOREIGN KEY (`recompense_id`) REFERENCES `recompenses` (`id`),
  ADD CONSTRAINT `defis_ibfk_2` FOREIGN KEY (`seance_id`) REFERENCES `seances` (`id`);

--
-- Constraints for table `defis_exercices`
--
ALTER TABLE `defis_exercices`
  ADD CONSTRAINT `defis_exercices_ibfk_1` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`),
  ADD CONSTRAINT `defis_exercices_ibfk_2` FOREIGN KEY (`exercice_id`) REFERENCES `exercices` (`id`);

--
-- Constraints for table `participationdefi`
--
ALTER TABLE `participationdefi`
  ADD CONSTRAINT `participationdefi_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `participationdefi_ibfk_2` FOREIGN KEY (`defi_id`) REFERENCES `defis` (`id`);

--
-- Constraints for table `salleentrainement`
--
ALTER TABLE `salleentrainement`
  ADD CONSTRAINT `salleentrainement_ibfk_1` FOREIGN KEY (`responsable_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `salleentrainement_ibfk_2` FOREIGN KEY (`salle_de_sport_id`) REFERENCES `salledesport` (`id`);

--
-- Constraints for table `seances`
--
ALTER TABLE `seances`
  ADD CONSTRAINT `seances_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
