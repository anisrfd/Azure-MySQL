const mysql = require('mysql');

function mysqlDB(){
    var config =
    {
        host: '*.mysql.database.azure.com',
        user: ' user name',
        password: 'user password ',
        database: 'database name',
        port: 3306,
        ssl: false
    };

    const conn = new mysql.createConnection(config);

    conn.connect(
        function (err) {
        if (err) {
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else
        {
           console.log("Connection established.");
               queryDatabase();
        }
    });

    function queryDatabase(){
        //drop table if exists
        conn.query('DROP TABLE IF EXISTS inventory;', function (err, results, fields) {
            if (err) throw err;
            console.log('Dropped inventory table if existed.');
        })
        //create new table
        conn.query('CREATE TABLE inventory (id serial PRIMARY KEY, name VARCHAR(50), quantity INTEGER);',
            function (err, results, fields) {
                if (err) throw err;
            console.log('Created inventory table.');
        })
        //insert data into table
        conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['Mobile', 150],
            function (err, results, fields) {
                if (err) throw err;
            else console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
        conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['Desktop', 154],
            function (err, results, fields) {
                if (err) throw err;
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
        conn.query('INSERT INTO inventory (name, quantity) VALUES (?, ?);', ['Laptop', 100],
        function (err, results, fields) {
                if (err) throw err;
            console.log('Inserted ' + results.affectedRows + ' row(s).');
        })
        conn.end(function (err) {
        if (err) throw err;
        else  console.log('Done.')
        });
    };

};

mysqlDB();