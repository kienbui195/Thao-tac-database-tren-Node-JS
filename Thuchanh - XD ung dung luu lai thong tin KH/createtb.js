const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'dbtest',
    charset: 'utf8_general_ci'
});

connection.connect(err => {
    if (err) {
        throw err.stack;
    } else {
        console.log('connect success!');
        const sql2 = 'CREATE TABLE customer (Id INT(3) PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25) NOT NULL, Address VARCHAR(25));'
        connection.query(sql2, err => {
            if (err) {
                console.log(err);
            }
            console.log('create table success!');
            connection.end();
        });
    }
});



