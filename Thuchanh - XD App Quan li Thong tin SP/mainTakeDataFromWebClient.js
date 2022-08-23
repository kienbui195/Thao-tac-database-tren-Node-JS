const mysql = require('mysql')
const http = require('http')
const url = require('url')
const Controller = require("./src/controller");
const port = 8080
const qs = require('qs')
let app = new Controller()



const connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'Abcd1234',
    database: 'quanlysanpham',
    charset: 'utf8_general_ci'
})

connection.connect(err => {
    if (err) {
        throw err.stack;
    }
    console.log('connect success')
})

const server = http.createServer( (req, res) => {
    let path = url.parse(req.url).pathname;
    let idData = qs.parse(url.parse(req.url).query).id;
    switch (path) {
        case '/':
            app.showHomePage(req,res);
            break;
        case '/create':
            app.createProduct(req, res);
            break;
        case '/delete':
            app.deleteProduct(req, res, idData);
            break;
        case '/update':
            app.updateProduct(req, res, idData);
            break;
        default:
            res.end()
    }
})

server.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`)
})