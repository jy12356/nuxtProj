var mysql = require('mysql2');
// Connection 객체 생성 
var pool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'vue_cli_test',
    waitForConnections: true,
    connectionLimit: 15,
    queueLimit: 0,
    dateStrings: [
        'DATE',
        'DATETIME'
    ]
});

var poolCount = 0;

var DB = (function() {

    function _query(query, params, callback) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err);
                pool.releaseConnection(connection);
                callback(null, err);
                throw err;
            }
            //const squery = connection.format(query,params);
            connection.query(query, params, callback);

            connection.on('error', function(err) {
                callback(null, err);
                throw err;
            });
            //connection.release();
            pool.releaseConnection(connection);
        });
    };

    function _create_con() {
        //_con.release();
        var _con = mysql.createConnection({
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'vue_cli_test',
            dateStrings: [
                'DATE',
                'DATETIME'
            ]
        });
        return _con;
    }

    return {
        query: _query,
        create_con: _create_con,
    };
})();

function keepAlive() {
    if (poolCount == 120) {
        pool.end();
        pool = mysql.createPool({
            host: 'localhost',
            host: 'elocalhost',
            port: 3306,
            user: 'root',
            password: '1234',
            database: 'vue_cli_test',
            waitForConnections: true,
            connectionLimit: 15,
            queueLimit: 0,
            dateStrings: [
                'DATE',
                'DATETIME'
            ]
        });
        poolCount = 0;
    }
    pool.getConnection(function(err, connection) {
        if (err) { return; }
        connection.ping();
        connection.release();
        poolCount++;
    });
}

setInterval(keepAlive, 60 * 1000);

module.exports = DB;