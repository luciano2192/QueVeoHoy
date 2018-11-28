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

function filterMovies(req,res) {
    var filterSql = 'select * from pelicula left join genero on pelicula.genero_id = genero.id where titulo like "%' + req.query.title + '%" and genero = ' + req.query.genre + ' and anio = ' + req.query.year;
    
    connection.query(filterSql, function(error,results,fields) {
        if(error) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        }

        var response = {
            'peliculas' : results,
        };
        console.log(response);
        res.send(JSON.stringify(response));
    })
};

module.exports = {
    'loadMovies': loadMovies,
    'loadGenresMovies': loadGenresMovies,
    'filterMovies': filterMovies,
};
