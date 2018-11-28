const connection = require('../lib/conexionbd');

function loadMovies(req,res) {
    var moviesSql = 'select * from pelicula';
    connection.query(moviesSql, function(error,results,fields) {
        if(error) {
            console.log('ERROR EN LA CONSULTA !', error.message);
            res.status(404).send('ERROR EN LA CONSULTA !');
        };

        var response = {
            'peliculas' : results,
        };

        res.send(JSON.stringify(response));
    });
};

function loadGenresMovies(req,res) {
    var genresSql = 'select * from genero';
    connection.query(genresSql, function(error,results,fields) {
        if(error) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        }

        var response = {
            'generos' : results,
        };

        res.send(JSON.stringify(response));
    });
};

module.exports = {
    'loadMovies' : loadMovies,
    'loadGenresMovies' : loadGenresMovies,
};
