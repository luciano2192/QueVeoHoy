const connection = require('../lib/conexionbd');

function loadMovies( req , res ) {
    var moviesSql = 'SELECT * '
                        + 'FROM pelicula '
                        + 'INNER JOIN genero '
                        + 'ON pelicula.genero_id = genero.id';
                        
    var limitSql = 'LIMIT ' + (req.query.pagina - 1) * 52 + ',' + req.query.cantidad;
    var order = 'ORDER BY ' + req.query.columna_orden + ' ' + req.query.tipo_orden;
    var countSql = 'SELECT COUNT(*) AS total FROM pelicula';
    
    if( req.query.titulo ) { 
        moviesSql += ' AND titulo LIKE "%' + req.query.titulo + '%"';
    } if( req.query.genero ) {
        moviesSql += ' AND genero.id = ' + req.query.genero;
    } if( req.query.anio ) {
        moviesSql += ' AND anio = ' + req.query.anio;
    };

    connection.query( `${moviesSql} ${order} ${limitSql}` , ( error , results , fields ) => {
        if(error) {
            console.log('ERROR EN LA CONSULTA !', error.message);
            res.status(404).send('ERROR EN LA CONSULTA !');
        };
        connection.query( countSql , ( error , resultsCount , fields ) =>  {
            if(error) {
                console.log( 'ERROR EN LA CONSULTA !' , error.message );
                res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
            };
            var response = {
                'peliculas' : results,
                'total' : resultsCount[0].total,
            };
            res.send(JSON.stringify(response));
        });
    });
};

function loadGenresMovies( req , res ) {
    var genresSql = 'SELECT * FROM genero';
    connection.query(genresSql, ( error , results , fields ) => {
        if(error) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        };
        var response = {
            'generos' : results,
        };
        res.send(JSON.stringify(response));
    });
};

function findMovieId( req , res ) {
    var movieGenreSql = 'SELECT pelicula.poster,pelicula.titulo,pelicula.anio,pelicula.trama,pelicula.fecha_lanzamiento,pelicula.director,pelicula.duracion,pelicula.puntuacion,genero.nombre '
                                + 'FROM pelicula '
                                + 'INNER JOIN genero ON pelicula.genero_id = genero.id '
                                + 'WHERE pelicula.id =';

    var actorSql = 'SELECT actor.nombre '
                                + 'FROM actor '
                                + 'INNER JOIN actor_pelicula ON actor_pelicula.actor_id = actor.id '
                                + 'WHERE pelicula_id =';

    connection.query( `${movieGenreSql} ${req.params.id}` , ( error , results , fields ) => {
        if( error ) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        };
        connection.query( `${actorSql} ${req.params.id}` , (error,resultActor,field)=>{
            if(error) {
                console.log('ERROR EN LA CONSULTA !',error.message);
                res.status(404).send('ERROR EN LA CONSULTA !');
            };
            var response = {
                'pelicula' : results[0],
                'genero' : results[1],
                'actores' : resultActor,
            };
            res.send(JSON.stringify(response));
        });                
    });
};


function recommendedMovie( req , res ) {
    var recomendationSql = 'SELECT pelicula.id,pelicula.poster,pelicula.trama,pelicula.titulo,genero.nombre '
                                + 'FROM pelicula '
                                + 'INNER JOIN genero on genero_id = genero.id ';
    
    if( req.query.genero ) {
        recomendationSql += 'AND genero.nombre = "' + req.query.genero + '" ';
    };    
    if( req.query.anio_inicio ) {
        recomendationSql += 'AND anio >= ' + req.query.anio_inicio;
    };
    if( req.query.anio_fin ) {
        recomendationSql += ' AND anio <= ' + req.query.anio_fin;
    };
    if( req.query.puntuacion ) {
        recomendationSql += 'AND puntuacion = ' + req.query.puntuacion;
    };
    
    connection.query( recomendationSql , ( error , results , fields ) => {
        if( error ) {
            console.log( 'ERROR EN LA CONSULTA !' , error.message );
            res.status( 404 ).send( 'ERROR EN LA CONSULTA !' );
        };                                                        
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
