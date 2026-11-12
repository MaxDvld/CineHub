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