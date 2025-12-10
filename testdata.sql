USE tspark;

INSERT INTO Users (name, role_id, actif) VALUES
('Alice Martin', 1, TRUE),
('Bob Dupont', 1, TRUE),
('Claire Leroy', 2, TRUE),
('David Moreau', 1, TRUE),
('Eva Bernard', 2, TRUE),
('Franck Simon', 1, FALSE),
('Gaelle Roche', 3, TRUE),
('Hugo Laurent', 1, TRUE),
('Isabelle Petit', 2, TRUE),
('Julien Caron', 1, TRUE);

INSERT INTO Seances (user_id, calories, date, temps) VALUES
(1, 300, '2024-01-05 10:00:00', 45),
(2, 450, '2024-01-06 11:00:00', 60),
(3, 500, '2024-01-07 09:45:00', 40),
(4, 350, '2024-01-08 08:30:00', 50),
(5, 600, '2024-01-09 17:00:00', 70),
(6, 250, '2024-01-10 19:00:00', 30),
(7, 700, '2024-01-11 14:00:00', 75),
(8, 420, '2024-01-12 12:00:00', 55),
(9, 530, '2024-01-13 15:00:00', 65),
(10, 300, '2024-01-14 16:30:00', 35);

INSERT INTO SalleDeSport (nom, adresse, numtel, description, activites) VALUES
('FitZone A', '10 Rue Alpha', 0610203040, 'Salle moderne.', JSON_ARRAY('cardio','muscu')),
('FitZone B', '20 Rue Beta', 0610203041, 'Grande salle.', JSON_ARRAY('yoga','pilates')),
('UrbanGym', '30 Rue Gamma', 0610203042, 'Ouverte 24/24.', JSON_ARRAY('crossfit','cardio')),
('PowerClub', '40 Rue Delta', 0610203043, 'Ambiance motivante.', JSON_ARRAY('muscu')),
('ZenStudio', '50 Rue Epsilon', 0610203044, 'Spécial bien-être.', JSON_ARRAY('yoga')),
('MegaFit', '60 Rue Zeta', 0610203045, 'Salle géante.', JSON_ARRAY('muscu','cardio')),
('SportHub', '70 Rue Eta', 0610203046, 'Innovante.', JSON_ARRAY('crossfit')),
('MaxFitness', '80 Rue Theta', 0610203047, 'Pour tous niveaux.', JSON_ARRAY('cardio')),
('PulseGym', '90 Rue Iota', 0610203048, 'Sport intensif.', JSON_ARRAY('muscu','crossfit')),
('VitalCenter', '100 Rue Kappa', 0610203049, 'Complet.', JSON_ARRAY('yoga','muscu'));

INSERT INTO SalleEntrainement (nom, capacite, equipements, responsable_id, salle_de_sport_id) VALUES
('Salle A', 20, JSON_ARRAY('tapis','halteres'), 1, 1),
('Salle B', 25, JSON_ARRAY('rameur','kettlebell'), 2, 2),
('Salle C', 15, JSON_ARRAY('cordes','ballons'), 3, 3),
('Salle D', 30, JSON_ARRAY('tapis','machines'), 4, 4),
('Salle E', 18, JSON_ARRAY('kettlebell','poids'), 5, 5),
('Salle F', 22, JSON_ARRAY('haltères','barres'), 6, 6),
('Salle G', 28, JSON_ARRAY('tapis','velo'), 7, 7),
('Salle H', 12, JSON_ARRAY('cordes'), 8, 8),
('Salle I', 16, JSON_ARRAY('machines','tapis'), 9, 9),
('Salle J', 24, JSON_ARRAY('halteres','rameur'), 10, 10);

INSERT INTO Recompenses (nom, type, int_value) VALUES
('Badge Bronze', 'badge', 10),
('Badge Argent', 'badge', 20),
('Badge Or', 'badge', 30),
('Récompense Mini', 'recompense', 5),
('Récompense Standard', 'recompense', 15),
('Récompense Premium', 'recompense', 25),
('Super Badge', 'badge', 40),
('Ultimate Badge', 'badge', 50),
('Boost XP', 'recompense', 35),
('Mega Reward', 'recompense', 45);

INSERT INTO Exercices (nom, description, complementaire) VALUES
('Pompes', 'Travail des pectoraux.', 'Triceps'),
('Tractions', 'Travail du dos.', 'Biceps'),
('Squats', 'Travail des jambes.', 'Fentes'),
('Gainage', 'Renforcement du tronc.', 'Planche'),
('Burpees', 'Exercice complet.', 'Pompes'),
('Fentes', 'Travail des cuisses.', 'Squats'),
('Saut corde', 'Cardio.', 'Burpees'),
('Rowing', 'Dos et bras.', 'Tractions'),
('Développé couché', 'Pectoraux.', 'Haltères'),
('Crunchs', 'Abdominaux.', 'Gainage');

INSERT INTO Defis (nom, difficulte, recompense_id, seance_id, objectifs, debut, fin) VALUES
('Défi Cardio 1', 1, 1, 1, JSON_OBJECT('calories',300), '2024-02-01 08:00:00', '2024-02-07 08:00:00'),
('Défi Force 1', 2, 2, 2, JSON_OBJECT('reps',50), '2024-02-02 09:00:00', '2024-02-08 09:00:00'),
('Défi Endurance', 3, 3, 3, JSON_OBJECT('temps',60), '2024-02-03 10:00:00', '2024-02-09 10:00:00'),
('Défi Sprint', 1, 4, 4, JSON_OBJECT('distance',1000), '2024-02-04 11:00:00', '2024-02-10 11:00:00'),
('Défi Puissance', 4, 5, 5, JSON_OBJECT('poids',100), '2024-02-05 12:00:00', '2024-02-11 12:00:00'),
('Défi Agilité', 2, 6, 6, JSON_OBJECT('reps',30), '2024-02-06 13:00:00', '2024-02-12 13:00:00'),
('Défi Ultra', 5, 7, 7, JSON_OBJECT('calories',700), '2024-02-07 14:00:00', '2024-02-13 14:00:00'),
('Défi Elite', 4, 8, 8, JSON_OBJECT('temps',90), '2024-02-08 15:00:00', '2024-02-14 15:00:00'),
('Défi Marathon', 5, 9, 9, JSON_OBJECT('distance',42195), '2024-02-09 16:00:00', '2024-02-15 16:00:00'),
('Défi Titan', 5, 10, 10, JSON_OBJECT('reps',100), '2024-02-10 17:00:00', '2024-02-16 17:00:00');

INSERT INTO Defis_Exercices (defi_id, exercice_id) VALUES
(1, 1), (1, 7),
(2, 2), (2, 8),
(3, 3), (3, 4),
(4, 5),
(5, 9), (5, 3),
(6, 6),
(7, 1), (7, 5),
(8, 4),
(9, 7), (9, 10),
(10, 2), (10, 9);

INSERT INTO ParticipationDefi (user_id, defi_id) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5),
(6, 6),
(7, 7),
(8, 8),
(9, 9),
(10, 10);