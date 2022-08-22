const mysql = require('mysql');
const qs = require('qs');
const http = require('http');
const url = require('url');
const fs = require('fs');

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
    } else console.log('Connect success!')
});

// const sqlInsert = `INSERT INTO customer (name, address) VALUES ('asdasd', 'Phu THo');`;
// connection.query(sqlInsert, (err, result) => {
//     if (err) {
//         throw err.stack;
//     } else console.log('1 record inserted');
// });

const sqlUpdate = `UPDATE customer SET name = 'Hung' WHERE name = 'asdasd';`;
connection.query(sqlUpdate, (err, result) => {
    if (err) {
        throw err.stack;
    } else console.log('update success!');
});