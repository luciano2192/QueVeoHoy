const connection = require('../lib/conexionbd');

function loadMovies( req , res ) {
    var moviesSql = 'SELECT * '
                        + 'FROM pelicula '
                        + 'INNER JOIN genero '
                        + 'ON pelicula.genero_id = genero.id ';
    
    if( req.query.titulo ) { 
        moviesSql += 'AND titulo LIKE "%' + req.query.titulo + '%" ';
    } if( req.query.genero ) {
        moviesSql += 'AND genero.id = "' + req.query.genero + '" ';
    } if( req.query.anio ) {
        moviesSql += 'AND anio = "' + req.query.anio + '" ';
    };

    connection.query( moviesSql += 'LIMIT ' + (req.query.pagina -1) * 52 + ',' + req.query.cantidad, function( error , results , fields ) {
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

function loadGenresMovies( req , res ) {
    var genresSql = 'select * from genero';
    connection.query(genresSql, function( error , results , fields ) {
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

function findMovieId( req , res ) {
    var findIdSql = 'SELECT * ' 
                                + 'FROM actor_pelicula '
                                + 'INNER JOIN pelicula ON pelicula_id = pelicula.id '
                                + 'INNER JOIN actor ON actor_id = actor.id '
                                + 'INNER JOIN genero ON genero_id = genero.id '
                                + 'WHERE pelicula.id = ' + req.params.id;
       
    connection.query( findIdSql , function( error , results , fields ) {
        if( error ) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        }
                            
        var response = {
            'pelicula' : results[0],
            'genero' : results[1],
            'actores' : results[2]
        };
                    
        res.send(JSON.stringify(response));
    });            
};

function recommendedMovie( req , res ) {
    var recomendationSql = 'SELECT pelicula.poster,pelicula.trama,pelicula.titulo,genero.nombre '
                                + 'FROM pelicula '
                                + 'INNER JOIN genero on genero_id = genero.id ';
    
    if( req.query.genero ) {
        recomendationSql += 'AND genero = "' + req.query.genero + '" ';
    };
    
    if( req.query.anio_inicio ) {
        recomendationSql += 'AND anio_inicio = ' + req.query.anio_inicio;
    };

    if( req.query.anio_fin ) {
        recomendationSql += 'AND anio_fin = ' + req.query.anio_fin;
    };

    if( req.query.puntuacion ) {
        recomendationSql += 'AND puntuacion = ' + req.query.puntuacion;
    };

    connection.query( recomendationSql , function( error , results , fields ) {
        if( error ) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        }
                                                        
        var response = {
            'peliculas' : results,
        };
                                                
        res.send(JSON.stringify(response));
    });                                
};

module.exports = {
    'loadMovies': loadMovies,
    'loadGenresMovies': loadGenresMovies,
    'findMovieId': findMovieId,
    'recommendedMovie': recommendedMovie
};
