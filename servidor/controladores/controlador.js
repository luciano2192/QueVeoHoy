const connection = require('../lib/conexionbd');

function showAllMovies(req,res) {
    var showMoviesSql = 'select * from pelicula';
    connection.query(showMoviesSql, function(error,results,fields) {
        if(error) {
            console.log('ERROR EN LA CONSULTA !', error.message);
            res.status(404).send('ERROR EN LA CONSULTA !');
        };

        var respuesta = {
            'peliculas': results,
        };

        res.send(JSON.stringify(respuesta));
    });
};

module.exports = {
    'showAllMovies' : showAllMovies,
};
