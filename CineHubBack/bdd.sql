   -- =============================================
   -- 1. CRÉATION DE LA BASE
   -- =============================================
   -- Supprime l'ancienne base si elle existe (pratique pour relancer le script)
   DROP DATABASE IF EXISTS cinehub;
   -- Crée la base (utf8mb4 = accepte les accents et les émojis)
   CREATE DATABASE cinehub CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
   -- "Ouvre" la base : les commandes suivantes s'appliquent à elle
   USE cinehub;

   -- =============================================
   -- 2. CRÉATION DES TABLES
   -- =============================================

   -- Table des utilisateurs
   CREATE TABLE users (
        us_id INT PRIMARY KEY AUTO_INCREMENT,         -- numéro unique, donné automatiquement (1, 2, 3...)
        us_username VARCHAR(255) NOT NULL UNIQUE,     -- pseudo : obligatoire, pas de doublon
        us_password TEXT NOT NULL,                    -- mot de passe haché (long texte)
        us_email VARCHAR(255) NOT NULL UNIQUE,        -- email : obligatoire, pas de doublon
        us_role ENUM('user', 'admin') NOT NULL DEFAULT 'user' -- rôle : seulement 'user' ou 'admin', 'user' par défaut
   );

   CREATE TABLE films (
        fi_id INT PRIMARY KEY AUTO_INCREMENT,
        fi_title VARCHAR(255) NOT NULL,
        fi_description TEXT NULL,
        fi_duration INT NOT NULL, 
        fi_genre VARCHAR(100) NULL,
        fi_release_date DATE NULL, 
        fi_is_showing TINYINT(1) NOT NULL DEFAULT 1
   );

   CREATE TABLE rooms (
        ro_id INT PRIMARY KEY AUTO_INCREMENT,
        ro_name VARCHAR(100) NOT NULL UNIQUE,
        ro_capacity INT NOT NULL
   );

      -- Table des séances (relie un film à une salle, à une date)
   CREATE TABLE screenings (
        sc_id INT PRIMARY KEY AUTO_INCREMENT,
        sc_film INT NOT NULL,               -- numéro du film (fi_id)
        sc_room INT NOT NULL,               -- numéro de la salle (ro_id)
        sc_datetime DATETIME NOT NULL,      -- date + heure, ex : 2026-12-01 20:30:00
        sc_price DECIMAL(6,2) NOT NULL,     -- prix avec 2 chiffres après la virgule, ex : 9.50

     -- Clés étrangères : sc_film doit exister dans films, sc_room dans rooms
        FOREIGN KEY (sc_film) REFERENCES films(fi_id),
        FOREIGN KEY (sc_room) REFERENCES rooms(ro_id)
   );

    CREATE TABLE reservations (
        re_id INT PRIMARY KEY AUTO_INCREMENT,
        re_user INT NOT NULL,                                    -- pas de UNIQUE ici
        re_screening INT NOT NULL,                               -- pas de UNIQUE ici
        re_seats INT NOT NULL DEFAULT 1,
        re_created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (re_user) REFERENCES users(us_id),
        FOREIGN KEY (re_screening) REFERENCES screenings(sc_id),
        UNIQUE (re_user, re_screening)                           -- le COUPLE est unique (dernier élément : pas de virgule)
    );

   -- =============================================
   -- 3. UTILISATEUR MYSQL
   -- =============================================
   -- Supprime l'ancien utilisateur s'il existe (pour relancer le script sans erreur)
   DROP USER IF EXISTS 'cine_user'@'localhost';
   -- Crée l'utilisateur avec son mot de passe
   CREATE USER 'cine_user'@'localhost' IDENTIFIED BY 'cinehub';
   -- Donne seulement les 4 droits demandés, et seulement sur la base cinehub
   GRANT SELECT, INSERT, UPDATE, DELETE ON cinehub.* TO 'cine_user'@'localhost';
   -- Applique les changements de droits
   FLUSH PRIVILEGES;

      -- =============================================
   -- 4. DONNÉES DE TEST
   -- =============================================

     -- Admin de test (mot de passe en clair : Admin1234)
   INSERT INTO users (us_username, us_email, us_password, us_role) VALUES
   ('admin', 'admin@cinehub.fr', '$2b$10$bNqtHftrcpFnydCFx/GaseAk3VaOjQ1jIcYP70xRYKXJ7xvVxXcx6', 'admin');

   -- Films (Titanic n'est plus à l'affiche : pratique pour tester /films/showing)
   INSERT INTO films (fi_title, fi_description, fi_duration, fi_genre, fi_release_date, fi_is_showing) VALUES
   ('Inception', 'Un voleur s''infiltre dans les rêves.', 148, 'Science-fiction', '2010-07-21', 1),
   ('Le Roi Lion', 'Un jeune lion doit reprendre sa place de roi.', 118, 'Animation', '2019-07-17', 1),
   ('Interstellar', 'Des astronautes voyagent à travers un trou de ver.', 169, 'Science-fiction', '2014-11-05', 1),
   ('Titanic', 'Une histoire d''amour à bord du célèbre paquebot.', 194, 'Drame', '1998-01-07', 0);

    INSERT INTO rooms (ro_name, ro_capacity) VALUES
    ('Salle 1', 120),
    ('Salle 2', 80),
    ('Salle 3', 50);

   -- Séances (film, salle, date/heure, prix)
   INSERT INTO screenings (sc_film, sc_room, sc_datetime, sc_price) VALUES
   (1, 1, '2026-12-01 20:30:00', 9.50),   -- Inception, Salle 1
   (1, 2, '2026-12-02 18:00:00', 8.00),   -- Inception, Salle 2
   (2, 3, '2026-12-01 14:00:00', 7.50),   -- Le Roi Lion, Salle 3
   (3, 1, '2026-12-03 21:00:00', 10.00);  -- Interstellar, Salle 1