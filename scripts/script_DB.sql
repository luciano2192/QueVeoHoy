CREATE DATABASE queVeo;

USE queVeo;

CREATE TABLE genero (
    id INT AUTO_INCREMENT,
    nombre VARCHAR(30),
    PRIMARY KEY (id)
);

SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-2-generos.sql;

CREATE TABLE pelicula (
    id INT AUTO_INCREMENT,
    titulo VARCHAR(100),
    duracion INT,
    director VARCHAR(400),
    anio INT,
    fecha_lanzamiento DATE,
    puntuacion INT,
    poster VARCHAR(300),
    trama VARCHAR(700),
    genero_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (genero_id) REFERENCES genero(id)
);

SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-1-peliculas.sql;


