CREATE DATABASE IF NOT EXISTS futbic CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE futbic;

CREATE TABLE usuarios (
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  equipo_favorito VARCHAR(100) NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE partidos (
  partido_id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  fecha DATE NOT NULL,
  hora TIME NOT NULL,
  liga VARCHAR(50) NOT NULL,
  equipo_local VARCHAR(100) NOT NULL,
  equipo_visitante VARCHAR(100) NOT NULL,
  goles_local INT NOT NULL CHECK (goles_local >= 0),
  goles_visitante INT NOT NULL CHECK (goles_visitante >= 0),
  lugar ENUM('Estadio', 'Casa', 'Bar', 'Otro') NOT NULL,
  valoracion TINYINT NOT NULL CHECK (valoracion BETWEEN 1 AND 5),
  observaciones TEXT,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id)
);
