const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'dbtest'
})

connection.connect(err => {
    if (err) {
        throw err.stack;
    } else console.log('Connect success!')
})

// const sql = `CREATE TABLE city (Id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25), Code INT);`;
// connection.query(sql, (err, result) => {
//     if (err) {
//         throw err.stack;
//     } else console.log('create success');
// })

// const sqlCreate = `CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY AUTO_INCREMENT, Name VARCHAR(25), Price INT(10));`;
// connection.query(sqlCreate, (err, result) => {
//     if (err) {
//         throw err.stack;
//     } else console.log('create success!')
// });

// const sqlDrop = `DROP TABLE IF EXISTS products;`;
// connection.query(sqlDrop, (err) => {
//     if (err) {
//         throw err.stack;
//     } else console.log('drop success!');
// });

const sqlAlter = `ALTER TABLE customer ADD COLUMN Age INT(3) DEFAULT 30;`;
connection.query(sqlAlter, (err) => {
    if (err) throw err.stack;
    else console.log('Alter success!')
})

