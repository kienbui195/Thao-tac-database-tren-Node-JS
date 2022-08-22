const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'dbtest',
    charset: 'utf8_general_ci'
});

// connection.connect(err => {
//     if (err) throw err.stack;
//     else  console.log('Connect success!');
//     const sql = 'SELECT * FROM customer;';
//     connection.query(sql, (err, result) => {
//         if (err) throw err.stack;
//         console.log(result);
//     })
// });

// connection.connect(err => {
//     if (err) throw err.stack;
//     else  console.log('Connect success!');
//     const sql = `SELECT * FROM customer WHERE address = 'Hanoi';`;
//     connection.query(sql, (err, result) => {
//         if (err) throw err.stack;
//         console.log(result, 'where');
//     })
// });

connection.connect(err => {
    if (err) throw err.stack;
    else  console.log('Connect success!');
    const sql = 'SELECT * FROM customer LIMIT 3;';
    connection.query(sql, (err, result) => {
        if (err) throw err.stack;
        console.log(result);
    })
});



