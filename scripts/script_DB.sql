CREATE DATABASE queVeo;

USE queVeo;

CREATE TABLE genero (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(30),
    PRIMARY KEY (id)
);

-- SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-2-generos.sql;

CREATE TABLE actor (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(70),
    PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    actor_id INT,
    pelicula_id INT,
    PRIMARY KEY (id)
);

-- SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-3-actores.sql;

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

-- SOURCE C:/Users/Lucho/Documents/ACAMICA/JS/LucianoGreco-QueVeoHoy/scripts/script-paso-1-peliculas.sql;
