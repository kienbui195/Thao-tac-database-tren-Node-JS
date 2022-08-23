const mysql = require('mysql');
const http = require('http');
const port = 9999;


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'quanlysanpham',
    charset: 'utf8_general_ci'
})

connection.connect(err => {
    if (err) {
        throw err.stack;
    } else {
        console.log('Connect success!')
        const sqlCreate = `CREATE TABLE IF NOT EXISTS products (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(25), price INT(10));`;
        connection.query(sqlCreate, (err, result) => {
            if (err) {
                throw err.stack;
            } else console.log(`Create success`)
        })
    }
})

const server = http.createServer(async (req, res) => {
    try {
        if (req.url === '/create' && req.method === 'POST') {
            const buffers = [];
            for await (const chunk of req) {
                buffers.push(chunk);
            }
            const data = Buffer.concat(buffers).toString();
            const product = JSON.parse(data);
            const price = parseInt(product.price)
            const sqlInsert = `INSERT INTO products (name, price) VALUES ('${product.name}','${price}');`;
            connection.query(sqlInsert, (err, result) => {
                if (err) {
                    throw err.stack;
                }
                res.end(JSON.stringify(product))
            })
        }
    }
    catch (err) {
        return res.end(err.message)
    }
})

server.listen(port, () => {
    console.log(`Server running at http:locolhost:${port}`)
})










