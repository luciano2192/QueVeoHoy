CREATE DATABASE queVeo;

USE queVeo;

CREATE TABLE pelicula (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100),
    duracion INT,
    director VARCHAR(400),
    anio INT,
    fecha_lanzamiento DATE,
    puntuacion INT,
    poster VARCHAR(300),
    trama VARCHAR(700)
 );

SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-1-peliculas.sql;