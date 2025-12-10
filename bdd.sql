CREATE DATABASE tspark;
USE tspark;

CREATE TABLE Roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO Roles (name) VALUES ('user'), ('proprietaire'), ('admin');

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    actif BOOLEAN NOT NULL DEFAULT TRUE,
    FOREIGN KEY (role_id) REFERENCES Roles(id)
);

CREATE TABLE Seances (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    calories INT NOT NULL,
    date DATETIME NOT NULL,
    temps INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id)
);

CREATE TABLE SalleDeSport (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    adresse VARCHAR(255) NOT NULL,
    numtel BIGINT,
    description TEXT,
    activites JSON
);

CREATE TABLE SalleEntrainement (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    capacite INT NOT NULL,
    equipements JSON,
    responsable_id INT NOT NULL,
    salle_de_sport_id INT NOT NULL,
    FOREIGN KEY (responsable_id) REFERENCES Users(id),
    FOREIGN KEY (salle_de_sport_id) REFERENCES SalleDeSport(id)
);

CREATE TABLE Recompenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    type ENUM('badge','recompense') NOT NULL,
    int_value INT NOT NULL
);

CREATE TABLE Exercices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    complementaire TEXT
);

CREATE TABLE Defis (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL,
    difficulte INT NOT NULL,
    recompense_id INT,
    seance_id INT,
    objectifs JSON,
    debut DATETIME NOT NULL,
    fin DATETIME NOT NULL,
    FOREIGN KEY (recompense_id) REFERENCES Recompenses(id),
    FOREIGN KEY (seance_id) REFERENCES Seances(id)
);

CREATE TABLE Defis_Exercices (
    defi_id INT NOT NULL,
    exercice_id INT NOT NULL,
    PRIMARY KEY (defi_id, exercice_id),
    FOREIGN KEY (defi_id) REFERENCES Defis(id),
    FOREIGN KEY (exercice_id) REFERENCES Exercices(id)
);

CREATE TABLE ParticipationDefi (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    defi_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (defi_id) REFERENCES Defis(id)
);
