const mysql = require("mysql");

/*Tao ket noi database*/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Abcd1234",
    database: "dbtest",
    charset: 'utf8_general_ci'
});

connection.connect(err => {
    if (err) {
        throw err.stack;
    }
    else console.log('connect success!')
})

// const sql = 'create table users (id int(3) primary key auto_increment, name varchar(25), age int(3), country varchar(20));';
// connection.query(sql,err => {
//     if (err) {
//         throw err.stack;
//     } else console.log('create table success!');
// })

// const sql2 = 'insert into users (name, age, country) values ("Kien", 27, "Hanoi");';
// connection.query(sql2,err => {
//     if (err) {
//         throw err.stack;
//     } else console.log('Insert success!');
// });

const sql3 = 'select * from users;';
connection.query(sql3,(err, result, fields) => {
    if (err) throw err.stack;
    console.log(result);
});






